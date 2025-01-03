import { MessageType } from '@/lib/constant';

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

console.log('background script loaded');
setInterval(async () => {
  chrome.storage.local.get(['allowTaskRunning'], async (result) => {
    if (result.allowTaskRunning) {
      const res = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/p1/v1/goods/alibaba/tasks/fetch`,
        {
          credentials: 'include',
        },
      );
      const resJson = await res.json();
      const data = resJson?.data;
      const json_obj = JSON.parse(data);
      if (!json_obj?.offer_id) {
        return;
      }
      const spiderRes = await fetch(
        `https://detail.1688.com/offer/${json_obj?.offer_id}.html`,
        {
          credentials: 'include',
        },
      );
      const spiderText = await spiderRes.text();
      const storeDataRe = new RegExp(/window.__STORE_DATA=(.*)/);
      const storeData = spiderText.match(storeDataRe);
      const initDataRe = new RegExp(/window.__INIT_DATA=(.*)/);
      const initData = spiderText.match(initDataRe);
      if (!storeData || !initData) {
        return;
      }
      fetch(
        `${import.meta.env.VITE_API_HOST}/api/p1/v1/goods/alibaba/tasks/report/data/detail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            offer_id: json_obj?.offer_id,
            seller_open_id: json_obj?.seller_open_id,
            store_data: storeData?.[1],
            init_data: initData?.[1],
          }),
        },
      )
        .then(async (res) => {
          console.log(await res.json());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}, 10000);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case MessageType.ALIBABA_COLLECT_PRODUCTS:
      fetch(
        `${import.meta.env.VITE_API_HOST}/api/p1/v1/goods/alibaba/collect/products`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'manual',
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ offer_ids: request.data }),
        },
      )
        .then(async (res) => {
          sendResponse({
            data: await res.json(),
          });
          if (res.status >= 300) {
            chrome.tabs.create({ url: 'https://admin.rogerogers.com' });
          } else {
            chrome.notifications.create({
              type: 'basic',
              iconUrl:
                'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://rogerogers.com&size=128',
              title: '采集成功',
              message: '采集成功',
            });
          }
        })
        .catch(() => {
          chrome.tabs.create({ url: 'https://admin.rogerogers.com' });
        });
      break;
    case MessageType.ALIBABA_COLLECT_PRODUCTS_EXISTS:
      fetch(
        `${import.meta.env.VITE_API_HOST}/api/p1/v1/goods/alibaba/collect/products/exists`,
        {
          credentials: 'include',
        },
      ).then(async (res) => {
        sendResponse({
          data: await res.json(),
        });
      });
  }
  return true;
});
