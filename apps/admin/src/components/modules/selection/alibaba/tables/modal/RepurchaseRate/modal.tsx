import { Button } from '@rogerogers/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rogerogers/ui/dialog';
import { RepurchaseRateChart } from './chart';

export const RepurchaseRateModal = ({ offerId }: { offerId: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>复购率</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle>复购率</DialogTitle>
          <DialogDescription>复购率</DialogDescription>
          <RepurchaseRateChart offerId={offerId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
