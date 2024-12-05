import { Button } from '@rogerogers/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rogerogers/ui/dialog';
import { SellPerDayChart } from './chart';

export const SellPerDayModal = ({ offerId }: { offerId: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>每日销量</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle>每日销量趋势</DialogTitle>
          <DialogDescription>每日销量趋势</DialogDescription>
          <SellPerDayChart offerId={offerId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
