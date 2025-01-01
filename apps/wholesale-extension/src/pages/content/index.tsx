console.log('content script start');

// inject injected script
console.log(location.href);
const s = document.createElement('script');
s.src = chrome.runtime.getURL('src/pages/content/injected.js');
s.onload = function () {
  // this.remove();
};
(document.head || document.documentElement).appendChild(s);
