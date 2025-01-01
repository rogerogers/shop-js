import { Card } from '@rogerogers/ui/card';
import { Toaster } from '@rogerogers/ui/toaster';

import { getDomainWithoutSubdomains } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { AlibabaSearchPanel } from './site/alibaba/searchPanel/index';
import { DefaultPanel } from './site/default';
import { TemuPanel } from './site/temu/panel';

const Condition = ({ site }: { site: string }) => {
  switch (site) {
    case 'temu':
      return <TemuPanel />;
    case 'alibabaSearch':
      return <AlibabaSearchPanel />;
    default:
      return <DefaultPanel />;
  }
};

export default function Popup() {
  const [site, setSite] = useState<string>('temu');
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      switch (getDomainWithoutSubdomains(tabs[0].url as string)) {
        case 'kuajingmaihuo.com':
          setSite('temu');
          break;
        case '1688.com':
          setSite('alibabaSearch');
          break;
        case 'noon.partners':
          setSite('noonAds');
          break;
        default:
          setSite('default');
          break;
      }
    });
  }, [site]);
  return (
    <Card className={'h-screen'}>
      <Condition site={site} />
      <Toaster />
    </Card>
  );
}
