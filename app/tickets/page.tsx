import prisma from '@/prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default async function Page() {
  const tickets = await prisma.ticket.findMany();
  return (
    <div>
      <Link
        href="tickets/new"
        className={buttonVariants({ variant: 'default' })}
      >
        Create new ticket
      </Link>
      <DataTable tickets={tickets} />
    </div>
  );
}
