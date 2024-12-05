'use client';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { ScrollArea } from '@rogerogers/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@rogerogers/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (pathname !== '/signin') {
      setShow(true);
    }
  }, [pathname]);
  const [open, setOpen] = useState(false);
  return (
    show && (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="!px-0 h-screen"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <ScrollArea className="h-full">
            <SheetTitle className="pl-10">Oms</SheetTitle>
            <div className="space-y-4 py-4 mb-5">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  {'Oms'}
                </h2>
                <div className="space-y-1">
                  <nav className="grid items-start gap-2">
                    <DashboardNav
                      items={navItems}
                      setOpen={setOpen}
                      level={1}
                    />
                  </nav>
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    )
  );
}
