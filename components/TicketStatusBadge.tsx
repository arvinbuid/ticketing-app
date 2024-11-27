import { Status } from '@prisma/client';
import { Badge } from './ui/badge';

type Color = 'bg-red-400' | 'bg-green-400' | 'bg-blue-400';

interface TicketStatusBadgeProps {
  status: Status;
}

const statusMap: Record<Status, { label: string; color: Color }> = {
  OPEN: { label: 'Open', color: 'bg-green-400' },
  STARTED: { label: 'Started', color: 'bg-blue-400' },
  CLOSED: { label: 'Closed', color: 'bg-red-400' },
};

export default function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  return (
    <Badge
      className={`${statusMap[status].color} text-background hover:${statusMap[status].color} hover:cursor-default`}
    >
      {statusMap[status].label}
    </Badge>
  );
}
