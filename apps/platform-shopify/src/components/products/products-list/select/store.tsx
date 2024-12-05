'use client';

import {} from '@rogerogers/next-common/data/attribute-server';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rogerogers/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

const StoreSelect = ({
  stores,
}: {
  stores: { data: { stores: ThirdStore[] } };
}) => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const store_id = searchParam?.get('store_id');
  return (
    <Select
      defaultValue={store_id ?? undefined}
      onValueChange={(v) => {
        const p = new URLSearchParams(searchParam.toString());
        p.set('store_id', v);
        p.set('page', '1');
        router.push(`/platforms/shopify/products?${p.toString()}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="选择店铺" />
      </SelectTrigger>
      <SelectContent>
        {stores?.data?.stores.map((item: ThirdStore) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StoreSelect;
