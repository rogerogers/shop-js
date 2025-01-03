import { obsConfig } from '@/lib/dom';

const obs = new MutationObserver(() => {
  const i = document.querySelector('#ice-container');
  console.log(i);
});

obs.observe(document.body, obsConfig);
