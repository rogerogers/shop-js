import { getSelectionProductDetail } from '@/service/selection-client';
import { Label } from '@rogerogers/ui/label';
import { RadioGroup, RadioGroupItem } from '@rogerogers/ui/radio-group';
import { useEffect, useState } from 'react';
import { DetailProps } from '.';
import { ModalCard } from './card';
import { tabs } from './data';

export const LanguageTabs = ({ offerId }: DetailProps) => {
  const [offerDetail, setOfferDetail] = useState<any>();
  const [country, setCountry] = useState('en');
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSelectionProductDetail({
        offer_id: offerId,
        country: 'en',
      });
      setOfferDetail(res?.result?.result);
    };
    fetchData();
  }, [offerId, country]);
  return (
    <>
      <RadioGroup
        defaultValue="en"
        className="grid grid-cols-8"
        onValueChange={(v) => {
          setCountry(v);
        }}
      >
        {tabs.map((v: any) => (
          <div key={v.value}>
            <RadioGroupItem
              value={v.value}
              id={v.value}
              className="peer sr-only"
            />
            <Label
              htmlFor={v.value}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              {v.key}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <ModalCard lang={country} />
    </>
  );
};
