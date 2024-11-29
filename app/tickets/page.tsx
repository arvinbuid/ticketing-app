import prisma from '@/prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

interface SearchParams {
  page: string;
}

export default async function Tickets({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const count = await prisma.ticket.count();

  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <Link
        href="tickets/new"
        className={buttonVariants({ variant: 'default' })}
      >
        Create new ticket
      </Link>
      <DataTable tickets={tickets} />
      <Pagination itemCount={count} pageSize={pageSize} currentPage={page} />
    </div>
  );
}
