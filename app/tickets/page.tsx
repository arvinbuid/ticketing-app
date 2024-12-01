import prisma from '@/prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status, Ticket } from '@prisma/client';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';

export interface SearchParams {
  status: Status;
  page: string;
  orderBy: keyof Ticket;
  orderDirection: 'asc' | 'desc';
}

export default async function Tickets({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(options);
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : 'createdAt';

  // Default to 'desc' if orderDirection is not provided or invalid
  const orderDirection =
    searchParams.orderDirection === 'asc' ||
    searchParams.orderDirection === 'desc'
      ? searchParams.orderDirection
      : 'desc';

  // SORTING
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  if (status) {
    where = {
      status,
    };
  } else {
    where = {
      NOT: [{ status: 'CLOSED' as Status }],
    };
  }

  // ADD SORTING TO THE QUERY
  const count = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: orderDirection,
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <div className="flex justify-between">
        {session?.user.role ? (
          <Link
            href="tickets/new"
            className={buttonVariants({ variant: 'default' })}
          >
            Create new ticket
          </Link>
        ) : (
          <span
            className={
              buttonVariants({
                variant: 'default',
              }) + ' cursor-not-allowed opacity-50'
            }
            title="Please log in to create a ticket"
          >
            Login to create ticket
          </span>
        )}
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination itemCount={count} pageSize={pageSize} currentPage={page} />
    </div>
  );
}
