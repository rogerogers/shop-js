import { getRequest } from '@/lib/fetch/server';
import { isDevelopment } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export async function listSalesChannel(params: any) {
  if (!isDevelopment()) {
    revalidateTag('sales_channel_list');
  }
  return await getRequest(`/sales-channels`, params, {
    next: { revalidate: 3600, tags: ['sales_channel_list'] },
  });
}
