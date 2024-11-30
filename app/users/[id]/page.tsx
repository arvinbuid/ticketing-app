import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';

interface EditUserProps {
  params: { id: string };
}

export default async function EditUser({ params }: EditUserProps) {
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p className="text-destructive">User Not Found!</p>;
  }
  user.password = '';

  return <UserForm user={user} />;
}
