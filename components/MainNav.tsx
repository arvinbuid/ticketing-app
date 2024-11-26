import Link from 'next/link';
import ToggleMode from './ToggleMode';
import MainNavLinks from './MainNavLinks';

export default function MainNav() {
  return (
    <section className="flex justify-between">
      <MainNavLinks />

      <div className="flex items-center gap-2">
        <Link href="/">Logout</Link>
        <ToggleMode />
      </div>
    </section>
  );
}
