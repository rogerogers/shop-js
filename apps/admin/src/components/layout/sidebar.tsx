'use client';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';

import Loading from '@/components/layout/loading';
import { useDataState } from '@/stores/data-store';
import { ScrollArea } from '@rogerogers/ui/scroll-area';
import { useLayoutEffect, useState } from 'react';
import { useStore } from 'zustand';

export default function Sidebar() {
  const menuCollapse = useStore(useDataState, (state) => state.menuCollapse);
  const toggleMenuCollapse = useDataState((state) => state.toggleMenuCollapse);
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    useDataState.persist.rehydrate();
    setLoading(false);
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollArea
      className={`${
        menuCollapse ? 'w-24' : 'w-72'
      } hidden h-screen lg:block border-r transition-[width] ease-in-out duration-500`}
    >
      <nav className={cn(`relative hidden h-screen pt-16 lg:block`)}>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                {!menuCollapse ? 'oms' : 'oms'.charAt(0).toUpperCase()}
              </h2>
              <nav className="grid items-start gap-2">
                <DashboardNav
                  items={navItems}
                  level={1}
                  menuCollapse={menuCollapse}
                />
              </nav>
            </div>
          </div>
        </div>
      </nav>
      <span
        className="absolute bottom-2 right-2 cursor-pointer"
        onClick={() => {
          toggleMenuCollapse();
        }}
      >
        {menuCollapse ? <IconChevronsRight /> : <IconChevronsLeft />}
      </span>
    </ScrollArea>
  );
}
