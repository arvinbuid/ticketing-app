import prisma from '@/prisma/db';
import dynamic from 'next/dynamic';

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
});

interface ParamsProps {
  params: { id: string };
}

export default async function UpdateTicket({ params }: ParamsProps) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found!</p>;
  }

  return <TicketForm ticket={ticket} />;
}
