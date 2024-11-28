import { Ticket } from '@prisma/client';

interface TicketDetailProps {
  ticket: Ticket;
}

export default function TicketDetail({ ticket }: TicketDetailProps) {
  return (
    <div>
      <p>{ticket.title}</p>
      <p>{ticket.description}</p>
    </div>
  );
}
