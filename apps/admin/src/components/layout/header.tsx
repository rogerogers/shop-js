import Settings from '@/config';
import { cn } from '@/lib/utils';
import { Link } from '@rogerogers/i18n/routing';
import Image from 'next/image';
import LanguageSwitcher from './language-switcher';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';

const Logo = () => {
  return (
    <Link href={'/dashboard'}>
      <Image src={Settings.logo} alt="logo" width={40} height={40} />
    </Link>
  );
};

export async function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block ps-4">
          <Logo />
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <UserNav />
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}

export function NonAuthHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="ps-4">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
