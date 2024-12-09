/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest } from '@/lib/fetch/server';

export async function listSalesChannel(params: any) {
  return await getRequest(`/sales-channels`, params, {
    next: { revalidate: 3600, tags: ['sales_channel_list'] },
  });
}
