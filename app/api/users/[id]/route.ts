import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/ValidationSchemas/users';
import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';
import options from '../../auth/[...nextauth]/options';

interface ParamsProps {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized action. Please login to continue' },
      { status: 401 }
    );
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json(
      {
        error: 'Invalid privileges. Only Admin can update a user!',
      },
      { status: 401 }
    );
  }

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

  // Only hash password if the password exists and not empty string, otherwise delete it
  if (body?.password && body.password !== '') {
    const hashPassword = await bcrypt.hash(body.password, 11);
    body.password = hashPassword;
  } else {
    delete body.password;
  }

  // If there is no same username, continue and throw error if there is duplicate username
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
