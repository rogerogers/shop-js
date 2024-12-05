'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/custom/dialog';
import StoreSelect from '@/components/select/store';
import { Button } from '@rogerogers/ui/button';
import { IconLoader } from '@tabler/icons-react';
import { useState } from 'react';

type ModalProps = {
  id: string;
};

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

const Modal: React.FC<ModalProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          上架
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e: any) => {
          e.preventDefault();
        }}
        closeAction={() => {
          setOpen(false);
        }}
      >
        <DialogHeader>
          <DialogTitle>确认上架</DialogTitle>
          <DialogDescription>商品上架</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-2">
          <StoreSelect />
          <StoreSelect />
          <StoreSelect />
          <StoreSelect />
          <StoreSelect />
          <StoreSelect />
        </div>
        <DialogFooter>
          <Button
            className="md:w-[100px] hover:border-2"
            onClick={async () => {
              setLoading(true);
              await sleep();
              setLoading(false);
              setOpen(false);
            }}
            disabled={loading}
          >
            {loading && <IconLoader className="mr-2 h-4 w-4 animate-spin" />}
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
