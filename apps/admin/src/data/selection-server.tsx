import { getRequest } from '@/lib/fetch/server';

export async function listSelectionData(params: any) {
  return await getRequest(`/p1/v1/ali/product/search`, params, {
    next: { revalidate: 3600 },
  });
}
