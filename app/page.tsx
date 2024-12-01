import DashChart from '@/components/DashChart';
import DashRecentTickets from '@/components/DashRecentTickets';
import prisma from '@/prisma/db';
import { Status } from '@prisma/client';

type GroupedTicket = {
  status: Status;
  _count: {
    id: number;
  };
};

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

  const data = groupTicket.map((item: GroupedTicket) => {
    return {
      status: item.status,
      total: item._count.id,
    };
  });

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </div>
  );
}
