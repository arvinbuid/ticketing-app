import prisma from '@/prisma/db';
import { ticketPatchSchema } from '@/ValidationSchemas/ticket';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
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
        error:
          'Invalid privileges. Please contact the administrator to edit your ticket.',
      },
      { status: 401 }
    );
  }

  const body = await request.json();
  const validation = ticketPatchSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  if (body?.assignedToUserId) {
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }

  // Get ticket from db
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }

  // Update ticket
  const updatedTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: { ...body },
  });

  return NextResponse.json(updatedTicket);
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
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
        error: 'Invalid privileges. Only Admin can delete a ticket!',
      },
      { status: 401 }
    );
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found!' }, { status: 404 });
  }

  await prisma.ticket.delete({
    where: { id: ticket.id },
  });

  return NextResponse.json({ message: 'Ticket deleted' });
}
