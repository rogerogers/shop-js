import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rogerogers/ui/dialog';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { CreateForm } from './create-form';
import { TypeFormSchema } from './schema';

type TypeForm = {
  data?: TypeFormSchema;
};

const UpdateDialog: React.FC<TypeForm> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog modal={true} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>编辑</span>
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
          <DialogTitle>更新属性</DialogTitle>
        </DialogHeader>
        <CreateForm setLoading={setLoading} setOpen={setOpen} data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
