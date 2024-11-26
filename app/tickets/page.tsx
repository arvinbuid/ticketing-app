import prisma from '@/prisma/db';
import DataTable from './DataTable';

export default async function Page() {
  const tickets = await prisma.ticket.findMany();
  return (
    <div>
      <DataTable tickets={tickets} />
    </div>
  );
}
