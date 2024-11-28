import prisma from '@/prisma/db';
import TicketDetail from './TicketDetail';

interface ParamsProps {
  params: { id: string };
}

export default async function ViewTicket({ params }: ParamsProps) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket Not Found!</p>;
  }

  return <TicketDetail ticket={ticket} />;
}
