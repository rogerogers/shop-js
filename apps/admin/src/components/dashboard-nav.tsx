'use client';

import { Link, usePathname } from '@rogerogers/i18n/routing';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItemWithOptionalChildren } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@rogerogers/ui/accordion';
import { Dispatch, SetStateAction } from 'react';

interface DashboardNavProps {
  items: NavItemWithOptionalChildren[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  level: number;
  menuCollapse?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  level,
  menuCollapse,
}: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <>
      {items.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowRight'];
        return item.items ? (
          <Accordion
            type="single"
            collapsible
            key={index}
            defaultValue={
              path.startsWith(item.href ?? '/un') ? item.href : undefined
            }
            onValueChange={() => {}}
          >
            <AccordionItem value={item.href || ''} className="border-none">
              <AccordionTrigger
                className={cn(
                  `py-1`,
                  !menuCollapse ? level - 1 && `pl-4` : level - 1 && `pl-2`,
                )}
              >
                <span
                  className={cn(
                    'flex items-center rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    item.disabled && 'cursor-not-allowed opacity-80',
                    level === 1 && 'px-3',
                  )}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {!menuCollapse && (
                    <span className="text-nowrap">{item.title}</span>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent
                className={cn(`pb-0`, !menuCollapse ? `pl-4` : `pl-2`)}
              >
                {item.items?.length !== 0 && (
                  <DashboardNav
                    menuCollapse={menuCollapse}
                    items={item.items}
                    level={level + 1}
                    setOpen={setOpen}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={index}
            href={item.disabled ? '/' : (item.href ?? '/')}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
          >
            <span
              className={cn(
                'flex items-center rounded-md pl-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                path.startsWith(item.href ?? '/un')
                  ? 'bg-accent'
                  : 'transparent',
                item.disabled && 'cursor-not-allowed opacity-80',
                level === 1 ? '' : !menuCollapse ? `pl-4` : `pl-2`,
              )}
            >
              <Icon className="mr-2 h-5 w-5" />
              {!menuCollapse && (
                <span className="text-nowrap">{item.title}</span>
              )}
            </span>
          </Link>
        );
      })}
    </>
  );
}
