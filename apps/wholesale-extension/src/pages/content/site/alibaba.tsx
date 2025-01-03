import { DataKey, ElementId, MessageType } from '@/lib/constant';
import { getElementByXpath } from '@/lib/dom';
import { findOfferId, sendContentMessage } from '@/lib/utils';
const initDataDiv = () => {
  const div = document.createElement('div');
  div.setAttribute('id', ElementId.ALIBABA_PAGE_DATA);
  div.setAttribute('style', 'display: none;');
  document.body.appendChild(div);
};
initDataDiv();

const getDataDiv = () => {
  return document.getElementById(ElementId.ALIBABA_PAGE_DATA);
};

const getTitleMap = () => {
  const tmpAlibabaProductsResponse = JSON.parse(
    document.getElementById('alibabaProductsResponse')?.textContent ?? '{}',
  );
  const titleMap: Map<string, string> = new Map();
  tmpAlibabaProductsResponse?.data?.content?.offerList?.forEach(
    (item: { subject: string; id: string }) => {
      titleMap.set(item?.subject, item?.id);
    },
  );
  return titleMap;
};

const initSubmit = () => {
  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'button');
  submitButton.setAttribute('id', 'wholesale-extension-submit');
  submitButton.innerHTML = '批量采集';
  submitButton.setAttribute(
    'style',
    'position: fixed; top: 50%; right: 20px; height: 33px; cursor: pointer; color: white; background-color: #1677ff; border: 0; border-radius: 4px; display: inline-flex; align-items: center; z-index: 99; padding-block: 1px; padding-inline: 6px;',
  );
  document.body.appendChild(submitButton);
  document
    .querySelector('button#wholesale-extension-submit')
    ?.addEventListener('click', () => {
      const offerIdList = [];
      for (const i of document.querySelectorAll('input.abcclass:checked')) {
        const offerId = i.getAttribute(DataKey.OFFER_ID);
        if (offerId) {
          offerIdList.push(offerId);
        }
      }
      sendContentMessage(
        {
          type: MessageType.ALIBABA_COLLECT_PRODUCTS,
          data: offerIdList,
        },
        (res) => {
          console.log(res);
        },
      );
    });
};
initSubmit();

const initSelectAll = () => {
  const selectButton = document.createElement('button');
  selectButton.setAttribute('type', 'button');
  selectButton.setAttribute('id', 'wholesale-extension-selectall');
  selectButton.innerHTML = '选择全部';
  selectButton.setAttribute(
    'style',
    'position: fixed; top: calc(50% - 50px); right: 20px; height: 33px; cursor: pointer; color: white; background-color: #1677ff; border: 0; border-radius: 4px; display: inline-flex; align-items: center; z-index: 99; padding-block: 1px; padding-inline: 6px;',
  );
  document.body.appendChild(selectButton);
  document
    .querySelector('button#wholesale-extension-selectall')
    ?.addEventListener('click', async () => {
      // 调用函数，每50毫秒滚动100像素
      for (const i of document.querySelectorAll('input.abcclass')) {
        const offerId = i.getAttribute(DataKey.OFFER_ID);
        //@ts-expect-error ts(2339)
        if (offerId && !i.disabled) {
          //@ts-expect-error ts(2339)
          i.checked = true;
        }
      }
    });
};

initSelectAll();

const config = { attributes: true, childList: true, subtree: true };
const checkBoxStyle = `position: absolute; top: 0; left: 0; height: 33px; width: 33px; cursor: pointer; z-index: 99;`;

const obs = new MutationObserver(() => {
  const mainPictures = document.querySelectorAll('img.main-picture');
  const titleMap = getTitleMap();
  for (const mainPicture of mainPictures) {
    const button = document.createElement('input');

    button.setAttribute('class', 'abcclass');
    button.setAttribute('type', 'checkbox');
    button.setAttribute('name', 'offerId[]');
    button.setAttribute('style', checkBoxStyle);

    const offerId =
      titleMap.get(
        mainPicture?.parentElement?.parentElement?.nextElementSibling
          ?.querySelector('p')
          ?.textContent?.trim() ?? '不存在',
      ) ?? '';

    if (!mainPicture.parentElement?.querySelector('input.abcclass')) {
      button.setAttribute(DataKey.OFFER_ID, offerId);
      mainPicture.parentElement?.setAttribute('style', 'position: relative;');
      mainPicture.parentElement?.appendChild(button);
      mainPicture.parentElement
        ?.querySelector('input.abcclass')
        ?.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
        });
    } else {
      if (
        offerId &&
        !mainPicture.parentElement
          ?.querySelector('input.abcclass')
          ?.getAttribute(DataKey.OFFER_ID)
      ) {
        mainPicture.parentElement
          ?.querySelector('input.abcclass')
          ?.setAttribute(DataKey.OFFER_ID, offerId);
      }
    }
  }
  const mainImgs = document.querySelectorAll('img.main-img');
  for (const mainImg of mainImgs) {
    const button = document.createElement('input');

    button.setAttribute('class', 'abcclass');
    button.setAttribute('type', 'checkbox');
    button.setAttribute('name', 'offerId[]');
    button.setAttribute('style', checkBoxStyle);
    let offerId = findOfferId(mainImg);
    if (!offerId) {
      offerId =
        titleMap.get(
          mainImg?.parentElement?.parentElement?.nextElementSibling
            ?.querySelector('p')
            ?.textContent?.trim() ?? '不存在',
        ) ?? '';
    }
    button.setAttribute(DataKey.OFFER_ID, offerId);
    if (!mainImg.parentElement?.querySelector('input.abcclass')) {
      mainImg.parentElement?.appendChild(button);
      mainImg.parentElement
        ?.querySelector('input.abcclass')
        ?.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
        });
    }
  }
  const checkOfferIds: string[] = [];
  document.querySelectorAll(`input.abcclass`).forEach((i) => {
    const offerId = i.getAttribute(DataKey.OFFER_ID);
    if (i.getAttribute(DataKey.EXISTS_CHECKED) === 'yes') {
      return;
    }
    if (offerId) {
      i.setAttribute(DataKey.EXISTS_CHECKED, 'yes');
      checkOfferIds.push(offerId);
    }
  });
  if (checkOfferIds.length > 0) {
    sendContentMessage(
      {
        type: MessageType.ALIBABA_COLLECT_PRODUCTS_EXISTS,
        data: checkOfferIds,
      },
      (res) => {
        for (const i of res.data?.data ?? []) {
          const offerId = i;
          const input = document.querySelector(
            `input.abcclass[${DataKey.OFFER_ID}="${offerId}"]`,
          );
          if (input) {
            //@ts-expect-error ts(2339)
            input.disabled = true;
          }
        }
      },
    );
  }
  if (
    document
      .querySelectorAll('input.abcclass')
      ?.values()
      .every((i) => !i.getAttribute(DataKey.OFFER_ID))
  ) {
    const dataDiv = getDataDiv();
    if (!dataDiv?.getAttribute(DataKey.REFETCHED)) {
      const prevPageEle = getElementByXpath("//button[text()='< 上一页']");
      // @ts-expect-error ts(2339)
      prevPageEle?.nextSibling?.click();
    }
  }
});

obs.observe(document.body, config);
// setTimeout(() => {
//   obs.disconnect();
//   console.log('disconnect');
// }, 10000);
