import { cn } from '@/lib/utils';
import { Button } from '@rogerogers/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';
import { ScrollArea } from '@rogerogers/ui/scroll-area';

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

type CardProps = React.ComponentProps<typeof Card>;

interface ModalCardProps extends CardProps {
  lang: string;
  offerDetail: any;
}

export function ModalCard({
  className,
  lang,
  offerDetail,
  ...props
}: ModalCardProps) {
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>{offerDetail?.subject}</CardTitle>
        <CardDescription>{offerDetail?.subjectTrans}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ScrollArea className="h-[60vh] mt-4">
          <div className="space-y-4">
            <div className="text-sm font-medium leading-none">
              卖家 OpenId：{offerDetail?.sellerOpenId}
            </div>
            <div className="text-sm font-medium leading-none">
              最小采购量：{offerDetail?.minOrderQuantity}
            </div>
            <div className="text-sm font-medium leading-none">
              <h3>卖点：</h3>
              <ul className="mt-4 list-disc space-y-4">
                {offerDetail?.sellingPoint?.map((item: any) => (
                  <li key={item} className="list-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-sm font-medium leading-none">
              视频：
              {offerDetail?.mainVideo && (
                <video
                  src={offerDetail?.mainVideo}
                  controls
                  className="mt-4 px-4"
                />
              )}
            </div>
            <div className="text-sm font-medium leading-none">
              描述：
              <div
                dangerouslySetInnerHTML={{
                  __html: offerDetail?.description,
                }}
              />
            </div>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button className="w-full">采集</Button>
      </CardFooter>
    </Card>
  );
}
