import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@prisma/client';
import Link from 'next/link';

interface DataTableProps {
  users: User[];
}

export default function DataTable({ users }: DataTableProps) {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-secondary cursor-default">
            <TableRow>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Username</TableHead>
              <TableHead className="font-medium">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id} data-href="/">
                  <TableCell>
                    <Link href={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/users/${user.id}`}>{user.username}</Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/users/${user.id}`}>{user.role}</Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
