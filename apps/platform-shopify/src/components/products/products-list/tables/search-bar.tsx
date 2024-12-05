'use client';

import { useRouter } from '@rogerogers/i18n/routing';
import { Button } from '@rogerogers/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@rogerogers/ui/drawer';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import Search from './search';

export default function SearchBar() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Drawer direction="top" open={open} dismissible={true}>
      <DrawerTrigger
        className="fixed right-4 top-20 z-20 cursor-pointer"
        asChild
      >
        <Button onClick={() => setOpen(true)}>
          <Filter />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="fixed top-0 bottom-auto mt-0">
        <DrawerHeader>
          <DrawerTitle>筛选</DrawerTitle>
          <DrawerDescription>shopify 商品筛选</DrawerDescription>
        </DrawerHeader>
        <div className="mx-8">
          <Search>
            <div className="space-x-2">
              <Button
                type="submit"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Search
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.push('/platforms/shopify/products');
                }}
              >
                重置
              </Button>
            </div>
          </Search>
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
