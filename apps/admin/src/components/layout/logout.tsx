'use client';
import { signOutAction } from '@/app/actions';
import { useRouter } from '@rogerogers/i18n/routing';
import { DropdownMenuItem } from '@rogerogers/ui/dropdown-menu';

export const Logout = () => {
  const router = useRouter();
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={async () => {
        await signOutAction();
        router.push('/signin');
      }}
    >
      Logout
    </DropdownMenuItem>
  );
};
