import Link from 'next/link';
import ToggleMode from './ToggleMode';
import MainNavLinks from './MainNavLinks';
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { MenuIcon } from 'lucide-react';

export default async function MainNav() {
  const session = await getServerSession(options);

  return (
    <section className="flex justify-between">
      <MainNavLinks role={session?.user.role} className="hidden md:flex" />

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-0 left-0 p-2">
        <Drawer direction="left">
          <DrawerTrigger>
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent>
            <div className="hidden">
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
            </div>
            <MainNavLinks
              role={session?.user.role}
              className="flex flex-col justify-center items-center mt-[3rem] pb-[1rem] gap-4 text-xl"
            />

            <div className="flex flex-col justify-center items-center pb-4 text-xl">
              {session ? (
                <div className="flex flex-col justify-center items-center gap-4">
                  <h1 className="hover:cursor-default">
                    Welcome {session?.user.name}
                  </h1>
                  <Link href="/api/auth/signout?callback=/" className="mb-4">
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="pb-4">
                  <Link href="/api/auth/signin">Login</Link>
                </div>
              )}

              <ToggleMode />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:flex items-center gap-2 sm:justify-start">
        {session ? (
          <div className="flex gap-3">
            <h1 className="hover:cursor-default">
              Welcome {session?.user.name}
            </h1>
            <Link href="/api/auth/signout?callback=/">Logout</Link>
          </div>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}

        <ToggleMode />
      </div>
    </section>
  );
}
