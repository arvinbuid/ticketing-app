import prisma from '@/prisma/db';
import { ticketSchema } from '@/ValidationSchemas/ticket';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsProps {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
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
