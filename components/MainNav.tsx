import Link from 'next/link';
import ToggleMode from './ToggleMode';
import MainNavLinks from './MainNavLinks';
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

export default async function MainNav() {
  const session = await getServerSession(options);

  return (
    <section className="flex justify-between">
      <MainNavLinks />

      <div className="flex items-center gap-2">
        {session ? (
          <Link href="/api/auth/signout?callback=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}

        <ToggleMode />
      </div>
    </section>
  );
}
