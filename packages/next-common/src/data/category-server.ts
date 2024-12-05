import { getRequest } from '@/lib/fetch/server';
import { isDevelopment } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export async function categoryWithAttribute(params: any) {
  if (isDevelopment()) {
    revalidateTag('category_with_attribute');
  }

  return await getRequest(`/categories/attribute`, params, {
    next: { revalidate: 3600, tags: ['category_with_attribute'] },
  });
}

export async function listCategory(params: any) {
  if (isDevelopment()) {
    revalidateTag('category_list');
  }
  return await getRequest(`/categories`, params, {
    next: { revalidate: 3600, tags: ['category_list'] },
  });
}

export async function getCategory(category_id: string) {
  if (isDevelopment()) {
    revalidateTag('category_detail');
  }
  return await getRequest(`/categories/${category_id}`, undefined, {
    next: { revalidate: 3600, tags: ['category_detail'] },
  });
}
