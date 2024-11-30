import DashRecentCharts from '@/components/DashRecentCharts';
import DashRecentTickets from '@/components/DashRecentTickets';
import prisma from '@/prisma/db';

export default async function Dashboard() {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: 'CLOSED' }],
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTicket = await prisma.ticket.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  });

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashRecentCharts />
        </div>
      </div>
    </div>
  );
}
