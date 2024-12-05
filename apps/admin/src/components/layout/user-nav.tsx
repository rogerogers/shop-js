import { auth } from '@/lib/auth';
import { redirect } from '@rogerogers/i18n/routing';
import { Avatar, AvatarFallback, AvatarImage } from '@rogerogers/ui/avatar';
import { Button } from '@rogerogers/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@rogerogers/ui/dropdown-menu';
import { Skeleton } from '@rogerogers/ui/skeleton';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { Logout } from './logout';

export async function UserNav() {
  const session = await auth();
  const locale = await getLocale();
  if (session === null) {
    redirect({ href: '/signin', locale: locale });
  }
  const user = session?.user;

  return (
    <DropdownMenu>
      <Suspense fallback={<Skeleton className="rounded-full h-8 w-8" />}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />
              <AvatarFallback>
                {user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      </Suspense>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Logout />
        {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
