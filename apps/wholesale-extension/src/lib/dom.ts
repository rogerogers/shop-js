export function scrollToBottom(
  step: number,
  interval: number,
  onEnd: () => void,
) {
  const clientHeight = document.documentElement.clientHeight;
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  const timer = setInterval(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + clientHeight < scrollHeight) {
      window.scrollTo(0, scrollTop + step);
      scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    } else {
      console.log('clear interval');
      onEnd();
      clearInterval(timer); // 清除定时器
    }
  }, interval);
}
