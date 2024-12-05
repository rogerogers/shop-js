import { Button } from '@rogerogers/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rogerogers/ui/dialog';
import { DetailProps } from '.';
import { LanguageTabs } from './tabs';

export const Modal = ({ offerId }: DetailProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>多语言</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle>详情</DialogTitle>
          <DialogDescription>多语言详情</DialogDescription>
          <LanguageTabs offerId={offerId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
