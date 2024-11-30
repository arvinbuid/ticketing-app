import { Ticket, User } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import ReactMarkDown from 'react-markdown';
import DeleteTicket from './DeleteTicket';
import AssignTicket from '@/components/AssignTicket';

interface TicketDetailProps {
  ticket: Ticket;
  users: User[];
}

export default function TicketDetail({ ticket, users }: TicketDetailProps) {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mr-4 mb-4 lg:col-span-3">
        <CardHeader>
          <div className="flex justify-between mb-4">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>

          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created At:{' '}
            {ticket.createdAt.toLocaleDateString('en-PH', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ReactMarkDown>{ticket.description}</ReactMarkDown>
        </CardContent>
        <CardFooter>
          Updated At:{' '}
          {ticket.updatedAt.toLocaleDateString('en-PH', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </CardFooter>
      </Card>
      <div className="flex lg:flex-col gap-2">
        <AssignTicket ticket={ticket} users={users} />
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={buttonVariants({ variant: 'default' })}
        >
          Edit Ticket
        </Link>
        <DeleteTicket ticketId={ticket.id} />
      </div>
    </div>
  );
}
