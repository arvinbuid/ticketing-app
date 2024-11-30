import options from '@/app/api/auth/[...nextauth]/options';
import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';

interface EditUserProps {
  params: { id: string };
}

export default async function EditUser({ params }: EditUserProps) {
  const session = await getServerSession(options);

  if (session?.user.role !== 'ADMIN') {
    return (
      <p className="text-destructive">
        You must be logged in to access this page.
      </p>
    );
  }

  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p className="text-destructive">User Not Found!</p>;
  }
  user.password = '';

  return <UserForm user={user} />;
}
