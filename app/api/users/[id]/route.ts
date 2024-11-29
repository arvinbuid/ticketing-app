import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/ValidationSchemas/users';
import prisma from '@/prisma/db';

interface ParamsProps {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
  }

  if (body?.password) {
    const hashPassword = await bcrypt.hash(body.password, 11);
    body.password = hashPassword;
  }

  // IF there is no same username, continue and throw error if there is duplicate username
  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (duplicateUsername) {
      return NextResponse.json(
        { error: 'Duplicate Username' },
        { status: 409 }
      );
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { ...body },
  });

  return NextResponse.json(updatedUser);
}
