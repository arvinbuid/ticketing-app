'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const statuses: { label: string; value?: string }[] = [
  { label: 'Open / Started' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Started', value: 'STARTED' },
  { label: 'Closed', value: 'CLOSED' },
];

export default function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectValueChange = (status: string) => {
    const params = new URLSearchParams();

    if (status) params.append('status', status); // e.g ?status=OPEN

    const query = params.size ? `?${params.toString()}` : '0'; // e.g ?status=OPEN || ?status=0
    router.push(`/tickets${query}`); // e.g tickets/?status=OPEN
  };

  return (
    <Select
      defaultValue={searchParams.get('status') || ''}
      onValueChange={handleSelectValueChange}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Filter by status"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem key={status.value || '0'} value={status.value || '0'}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
