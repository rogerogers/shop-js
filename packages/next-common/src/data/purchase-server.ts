import { getRequest } from '@/lib/fetch/server';

export async function purchaseReveiveAddress() {
  return await getRequest(
    `/p1/v1/ali/purchase/receive/address`,
    {},
    {
      next: { revalidate: 3600, tags: ['purchase_receive_address'] },
    },
  );
}
