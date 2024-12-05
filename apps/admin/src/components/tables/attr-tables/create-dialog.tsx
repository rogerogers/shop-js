import { cn } from '@/lib/utils';
import { Button } from '@rogerogers/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rogerogers/ui/dialog';
import { Loader, Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateForm } from './create-form';

export default function CreateDialog() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog modal={true} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs md:text-sm mt-6" onClick={() => {}}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {loading && (
          <div
            className={cn(
              'absolute flex h-full w-full z-10 items-center justify-center bg-gray-800 opacity-65',
            )}
          >
            <Loader className="animate-spin" />
          </div>
        )}
        <DialogHeader>
          <DialogTitle>新增属性</DialogTitle>
        </DialogHeader>
        <CreateForm setLoading={setLoading} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
