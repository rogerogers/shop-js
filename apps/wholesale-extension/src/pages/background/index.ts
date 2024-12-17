console.log('background script loaded');
setInterval(async () => {
  console.log(import.meta.env.VITE_API_HOST);
  chrome.storage.local.set({ abc: 'def' });
  chrome.storage.local.get('abc', (res) => {
    console.log(res);
  });
  const res = await fetch(
    `${import.meta.env.VITE_API_HOST}/api/p1/v1/goods/alibaba/tasks/fetch`,
    {
      credentials: 'include',
    },
  );
  const resJson = await res.json();
  const data = resJson?.data;
  const json_obj = JSON.parse(data);
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
}, 10000);
