import { CheckType } from '@/types/check';
import { Button } from '@rogerogers/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@rogerogers/ui/card';
import { Label } from '@rogerogers/ui/label';
import { ScrollArea } from '@rogerogers/ui/scroll-area';
import { Switch } from '@rogerogers/ui/switch';
import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CheckImageList } from './modules/check';

export const AlibabaSearchPanel = () => {
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(true);
  const [imgList, setImgList] = useState<CheckType[]>([]);
  chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
      let offerList = [];
      const requestData = JSON.parse(request.data);
      switch (request.type) {
        case 'alibabaStoreProducts':
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          offerList = requestData.data?.content?.offerList?.map((i: any) => {
            return {
              id: i.id,
              label: 'https://cbu01.alicdn.com/' + i.offerImages[0].imageURI,
              title: i.subject,
            };
          });
          setImgList(offerList);
          break;
      }
      sendResponse({});
    },
  );
  chrome.runtime.onMessage.addListener(function (request) {
    switch (request.type) {
      case 'alibabaSearchList':
        setImgList(request.data);
        break;
    }
  });
  useEffect(() => {
    chrome.storage.local.get(['alibabaScrollToBottom'], (result) => {
      setScrollToBottom(result.alibabaScrollToBottom);
      if (result.alibabaScrollToBottom) {
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id as number },
        func: () => {
          chrome.storage.local.get(['alibabaScrollToBottom'], (result) => {
            if (result.alibabaScrollToBottom) {
              window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: 'smooth',
              });
            }
          });
          const tmpImgList: CheckType[] = [];
          const offerList = document.querySelector(
            'div.space-common-offerlist',
          );
          const imgs = offerList?.querySelectorAll('img.main-img');
          for (const img of imgs ?? []) {
            const fatherA = img.closest('a');
            const fatherAChildA = img
              .closest('a')
              ?.querySelector('div.hover-actions>a');
            const title = fatherA
              ?.querySelector('div.title-text')
              ?.textContent?.trim();
            let offerId =
              URL.parse(
                fatherAChildA?.getAttribute('href') ?? '',
              )?.searchParams.get('offerIds') ?? '';
            if (!offerId) {
              offerId =
                (fatherA?.getAttribute('href') ?? '').match(
                  'offer/(?<offerId>.*).html',
                )?.groups?.offerId ?? '';
            }
            if (!offerId) {
              offerId =
                fatherA?.getAttribute('data-renderkey')?.split('_').at(-1) ??
                '';
            }
            if (!offerId) {
              const firstOfferId = fatherA
                ?.getAttribute('data-aplus-report')
                ?.split('^')
                .filter((i) => i.includes('offerId'))[0];

              offerId = firstOfferId?.split('@').at(-1) ?? '';
            }
            if (!offerId) {
              continue;
            }
            tmpImgList.push({
              id: offerId,
              label: img.getAttribute('src') ?? '',
              title: title ?? '',
            });
          }
          chrome.runtime.sendMessage({
            type: 'alibabaSearchList',
            data: tmpImgList,
          });
        },
      });
    });
  }, []);
  return (
    <Card className="h-screen flex flex-col overflow-y-hidden">
      <CardHeader>
        <CardTitle className="space-x-4 flex items-center">
          <span>1688 商品列表</span>
          <Button
            size={'sm'}
            onClick={() => {
              location.reload();
            }}
          >
            <RefreshCw />
          </Button>
          <div className="inline-flex cursor-pointer">
            <Switch
              id="airplane-mode"
              checked={scrollToBottom}
              onClick={() => {
                setScrollToBottom(!scrollToBottom);
                chrome.storage.local.set({
                  alibabaScrollToBottom: !scrollToBottom,
                });
              }}
            />
            <Label htmlFor="scrollToBottom">页面滚动到底部</Label>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-60px)]">
          <CheckImageList images={imgList} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
