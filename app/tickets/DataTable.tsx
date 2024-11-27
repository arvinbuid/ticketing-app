import { Ticket } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TicketStatusBadge from '@/components/TicketStatusBadge';

interface DataTableProps {
  tickets: Ticket[];
}

export default function DataTable({ tickets }: DataTableProps) {
  return (
    <div className="mt-5 py-2 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>
              <div className="flex justify-center mr-3">Status</div>
            </TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets
            ? tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <div className="flex justify-center mr-3">
                      <TicketStatusBadge status={ticket.status} />
                    </div>
                  </TableCell>
                  <TableCell>{ticket.priority}</TableCell>
                  <TableCell>
                    {ticket.createdAt.toLocaleDateString('en-PH', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
}
