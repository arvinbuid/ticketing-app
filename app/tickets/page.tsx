import prisma from '@/prisma/db';

export default async function Page() {
  const tickets = await prisma.ticket.findMany();

  console.log(tickets);
  return (
    <div>
      <h1>Tickets</h1>
    </div>
  );
}
