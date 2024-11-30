import prisma from '@/prisma/db';
import { ticketPatchSchema } from '@/ValidationSchemas/ticket';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsProps {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
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
