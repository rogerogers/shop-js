const getRequestPath = (urlString) => {
  if (urlString.includes('//')) {
    urlString = 'https:' + urlString;
  }
  try {
    const url = new URL(urlString);
    return url.pathname;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

(function () {
  var XHR = XMLHttpRequest.prototype;

  var open = XHR.open;
  var send = XHR.send;

  XHR.open = function (method, url) {
    this._method = method;
    this._url = url;
    return open.apply(this, arguments);
  };

  XHR.send = function () {
    this.addEventListener('load', function () {
      const pathname = getRequestPath(this._url);
      if (
        [
          '/h5/mtop.alibaba.alisite.cbu.server.moduleasyncservice/1.0/',
        ].includes(pathname)
      ) {
        console.log(this.response, this._url, '111');
        chrome.runtime.sendMessage(
          'nlgclliiihmeiiphlhphjgjahdghloah',
          {
            type: 'alibabaStoreProducts',
            data: this.response,
          },
          () => {},
        );
      }
    });
    return send.apply(this, arguments);
  };
})();

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
  const response = await origFetch(...args);
  response
    .clone()
    .json() // maybe json(), text(), blob()
    .then((data) => {
      console.log(data);
      //window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
    })
    .catch((err) => console.error(err));
  return response;
};