/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest } from '@/lib/fetch/server';

export async function categoryWithAttribute(params: any) {
  return await getRequest(`/categories/attribute`, params, {
    next: { revalidate: 3600, tags: ['category_with_attribute'] },
  });
}

export async function listCategory(params: any) {
  return await getRequest(`/categories`, params, {
    next: { revalidate: 3600, tags: ['category_list'] },
  });
}

export async function getCategory(category_id: string) {
  return await getRequest(`/categories/${category_id}`, undefined, {
    next: { revalidate: 3600, tags: ['category_detail'] },
  });
}
