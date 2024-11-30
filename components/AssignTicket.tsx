'use client';

import { Ticket, User } from '@prisma/client';
import { useState } from 'react';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import toast from 'react-hot-toast';

export default function AssignTicket({
  users,
  ticket,
}: {
  users: User[];
  ticket: Ticket;
}) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState('');

  const assignTicket = async function (userId: string) {
    try {
      setError('');
      setIsAssigning(true);

      await axios.patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === '0' ? null : userId,
      });
      toast.success('Ticket assigned to user successfully.');
      setIsAssigning(false);
    } catch (err) {
      console.log(err);
      setError('Error assigning ticket');
    }
  };

  return (
    <>
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || '0'}
        onValueChange={assignTicket}
        disabled={isAssigning}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Select user"
            defaultValue={ticket.assignedToUserId?.toString() || '0'}
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassign</SelectItem>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-destructive">{error}</p>
    </>
  );
}
