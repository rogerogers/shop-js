import MinimalTiptapThree from '@/components/custom/editor';

import { cn } from '@/lib/utils';
import { NextImage } from '@rogerogers/next-common/custom/next-image';
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
import { TooltipProvider } from '@rogerogers/ui/tooltip';

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
        <ScrollArea className="h-[100vh]">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="basis-1/5">
                <div className="sticky top-4">基础信息</div>
              </div>
              <div className="flex flex-col basis-4/5">
                <div className="text-sm font-medium leading-none">
                  卖家 OpenId：{offerDetail?.sellerOpenId}
                </div>
                <div className="text-sm font-medium leading-none">
                  最小采购量：{offerDetail?.minOrderQuantity}
                </div>
                <div>
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
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="basis-1/5">
                <div className="sticky top-4">商品图片：</div>
              </div>
              <div className="basis-4/5 grid grid-cols-8">
                {offerDetail?.productImage?.images.map((item: any) => (
                  <NextImage
                    key={item}
                    src={item}
                    sizes="20vh"
                    className="w-[100px]"
                  />
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="basis-1/5">
                <div className="sticky top-4">Sku信息：</div>
              </div>
              <div className="basis-4/5 space-y-2">
                {offerDetail?.productSkuInfos?.map((item: any) => {
                  let image = '';
                  return (
                    <div key={item.skuId} className="flex">
                      <div className="basis-1/4">
                        {item?.skuAttributes.reduce(
                          (prev: any, curr: any, currIndex: number) => {
                            if (curr.skuImageUrl) {
                              image = curr.skuImageUrl;
                            }
                            return (
                              prev +
                              ' ' +
                              curr.attributeName +
                              ': ' +
                              curr.value +
                              (currIndex !== item?.skuAttributes.length - 1
                                ? ','
                                : '')
                            );
                          },
                          '',
                        )}
                      </div>
                      <div className="basis-1/2">
                        销量：{item?.amountOnSale} 价格 {item?.consignPrice} Sku{' '}
                        {item?.skuId}
                      </div>
                      <div className="basis-1/4">
                        <NextImage
                          src={image}
                          sizes="20vh"
                          className="w-[100px]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="basis-1/5">
                <div className="sticky top-4">销售信息：</div>
              </div>
              <div className="basis-4/5">
                <p>
                  售后分数：
                  {offerDetail?.sellerDataInfo?.afterSalesExperienceScore}
                </p>
                <p>
                  48小时送达率：
                  {offerDetail?.sellerDataInfo?.collect30DayWithin48HPercent *
                    100}{' '}
                  %
                </p>
                <p>
                  复购率：
                  {offerDetail?.sellerDataInfo?.repeatPurchasePercent * 100} %
                </p>
                <p>
                  质量问题退货率：
                  {offerDetail?.sellerDataInfo?.qualityRefundWithin30Day *
                    100}{' '}
                  %
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="basis-1/5">
                <div className="sticky top-4">描述：</div>
              </div>
              <div className="basis-4/5 pr-8">
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: offerDetail?.description?.replaceAll(
                      / class="\S*"/g,
                      '',
                    ),
                  }}
                /> */}
                {offerDetail?.description && (
                  <TooltipProvider>
                    <MinimalTiptapThree
                      immediatelyRender={false}
                      editorContentClassName="p-6 overflow-scroll h-[800px] lg:max-w-full xm:max-w-[500px]"
                      onChange={(value) => {
                        console.log(value);
                      }}
                      content={offerDetail?.description}
                    />
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="space-x-4">
          <Button>保存</Button>
          <Button>上传</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
