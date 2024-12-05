import { getRequest } from '@/lib/fetch/server';
import { isDevelopment } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export async function purchaseReveiveAddress() {
  if (isDevelopment()) {
    revalidateTag('purchase_receive_address');
  }

  return await getRequest(
    `/p1/v1/ali/purchase/receive/address`,
    {},
    {
      next: { revalidate: 3600, tags: ['purchase_receive_address'] },
    },
  );
}
