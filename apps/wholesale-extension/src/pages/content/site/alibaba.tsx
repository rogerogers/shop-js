import { scrollToBottom } from '@/lib/dom';
import { findOfferId } from '@/lib/utils';

const initSubmit = () => {
  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'button');
  submitButton.setAttribute('id', 'wholesale-extension-submit');
  submitButton.innerHTML = '批量采集';
  submitButton.setAttribute(
    'style',
    'position: fixed; top: 50%; right: 20px; height: 33px; cursor: pointer; color: white; background-color: #1677ff; border: 0; border-radius: 4px; display: inline-flex; align-items: center; z-index: 99;',
  );
  document.body.appendChild(submitButton);
  document
    .querySelector('button#wholesale-extension-submit')
    ?.addEventListener('click', () => {
      const offerIdList = [];
      for (const i of document.querySelectorAll('input.abcclass:checked')) {
        const offerId = findOfferId(i);
        if (offerId) {
          offerIdList.push(offerId);
        }
      }
      alert(offerIdList.length + JSON.stringify(offerIdList));
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
    'position: fixed; top: calc(50% - 50px); right: 20px; height: 33px; cursor: pointer; color: white; background-color: #1677ff; border: 0; border-radius: 4px; display: inline-flex; align-items: center; z-index: 99;',
  );
  document.body.appendChild(selectButton);
  document
    .querySelector('button#wholesale-extension-selectall')
    ?.addEventListener('click', async () => {
      // 调用函数，每50毫秒滚动100像素
      scrollToBottom(100, 50, () => {
        for (const i of document.querySelectorAll('input.abcclass')) {
          const offerId = findOfferId(i);
          //@ts-expect-error ts(2339)
          if (offerId && !i.disabled) {
            i.setAttribute('checked', 'checked');
          }
        }
      });
    });
};

initSelectAll();

const config = { attributes: true, childList: true, subtree: true };
const checkBoxStyle = `position: absolute; top: 0; left: 0; height: 33px; width: 33px; cursor: pointer;`;

const obs = new MutationObserver(() => {
  const mainPictures = document.querySelectorAll('img.main-picture');
  for (const mainPicture of mainPictures) {
    const button = document.createElement('input');

    button.setHTMLUnsafe('采集');
    button.setAttribute('class', 'abcclass');
    button.setAttribute('type', 'checkbox');
    button.setAttribute('name', 'offerId[]');
    button.setAttribute('style', checkBoxStyle);
    if (!mainPicture.parentElement?.querySelector('input.abcclass')) {
      mainPicture.parentElement?.setAttribute('style', 'position: relative;');
      mainPicture.parentElement?.appendChild(button);
      mainPicture.parentElement
        ?.querySelector('button.abcclass')
        ?.addEventListener('click', (e) => {
          alert('hello');
          e.stopImmediatePropagation();
        });
    }
  }
  const mainImgs = document.querySelectorAll('img.main-img');
  for (const mainImg of mainImgs) {
    const button = document.createElement('input');

    button.setHTMLUnsafe('采集');
    button.setAttribute('class', 'abcclass');
    button.setAttribute('type', 'checkbox');
    button.setAttribute('name', 'offerId[]');
    button.setAttribute('style', checkBoxStyle);
    if (!mainImg.parentElement?.querySelector('input.abcclass')) {
      mainImg.parentElement?.appendChild(button);
      mainImg.parentElement
        ?.querySelector('button.abcclass')
        ?.addEventListener('click', (e) => {
          alert('hello');
          e.stopImmediatePropagation();
        });
    }
  }
});

obs.observe(document.body, config);
// setTimeout(() => {
//   obs.disconnect();
//   console.log('disconnect');
// }, 10000);
