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
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { SearchParams } from './page';
import { ArrowDown } from 'lucide-react';

interface DataTableProps {
  tickets: Ticket[];
  searchParams: SearchParams;
}

export default function DataTable({ tickets, searchParams }: DataTableProps) {
  return (
    <div className="mt-5 py-2 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Link
                href={{
                  query: {
                    ...searchParams,
                    orderBy: 'title',
                    orderDirection:
                      searchParams.orderDirection === 'asc' ? 'desc' : 'asc',
                  },
                }}
              >
                Title
              </Link>
              {'title' === searchParams.orderBy && (
                <ArrowDown
                  className={`inline p-1 ${
                    searchParams.orderDirection === 'asc' ? 'rotate-180' : ''
                  }`}
                />
              )}
            </TableHead>
            <TableHead>
              <div className="flex justify-center mr-3">
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: 'status',
                      orderDirection:
                        searchParams.orderDirection === 'asc' ? 'desc' : 'asc',
                    },
                  }}
                >
                  Status
                </Link>
                {'status' === searchParams.orderBy && (
                  <ArrowDown
                    className={`inline p-1 ${
                      searchParams.orderDirection === 'asc' ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex justify-center mr-3">
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: 'priority',
                      orderDirection:
                        searchParams.orderDirection === 'asc' ? 'desc' : 'asc',
                    },
                  }}
                >
                  Priority
                </Link>
                {'priority' === searchParams.orderBy && (
                  <ArrowDown
                    className={`inline p-1 ${
                      searchParams.orderDirection === 'asc' ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>
            </TableHead>
            <TableHead>
              <Link
                href={{
                  query: {
                    ...searchParams,
                    orderBy: 'createdAt',
                    orderDirection:
                      searchParams.orderDirection === 'asc' ? 'desc' : 'asc',
                  },
                }}
              >
                Created At
              </Link>
              {'createdAt' === searchParams.orderBy && (
                <ArrowDown
                  className={`inline p-1 ${
                    searchParams.orderDirection === 'asc' ? 'rotate-180' : ''
                  }`}
                />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets
            ? tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center mr-3">
                      <TicketStatusBadge status={ticket.status} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center mr-3">
                      <TicketPriority priority={ticket.priority} />
                    </div>
                  </TableCell>
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
