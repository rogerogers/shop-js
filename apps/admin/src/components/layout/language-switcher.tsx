'use client';
import { type Locale, nameMap } from '@/i18n/request';
import { cn } from '@/lib/utils';
import { usePathname } from '@rogerogers/i18n/routing';
import { Button } from '@rogerogers/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@rogerogers/ui/dropdown-menu';
import { IconLanguage } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type CompProps = {};
export default function LanguageSwitcher({}: CompProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const lang = useLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <IconLanguage />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-2">
        {Object.keys(nameMap).map((item) => {
          const itemLocale = item as Locale;
          return (
            <DropdownMenuItem
              key={item}
              className={cn(lang === itemLocale ? 'bg-accent' : '')}
            >
              {lang === itemLocale ? (
                <div>{nameMap?.[itemLocale]}</div>
              ) : (
                <Link
                  href={`/${itemLocale}/${pathName}?${searchParams.toString()}`}
                  className="w-full h-full"
                >
                  {nameMap?.[itemLocale]}
                </Link>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
