import { revalidateTag } from 'next/cache';
import { getRequest } from '../lib/fetch/server';
import { isDevelopment } from '../lib/utils';

export async function listAttribute(params: any) {
  if (isDevelopment()) {
    revalidateTag('attribute_list');
  }
  return await getRequest(`/attributes`, params, {
    next: { revalidate: 3600, tags: ['attribute_list'] },
  });
}

export async function listAttributeValue(params: any) {
  if (isDevelopment()) {
    revalidateTag('attribute_value');
  }
  return await getRequest(`/attributes`, params, {
    next: { revalidate: 3600, tags: ['attribute_value'] },
  });
}

export async function getAttribute(attribute_id: string, params: any) {
  if (isDevelopment()) {
    revalidateTag('attribute_detail');
  }
  return await getRequest(`/attributes/${attribute_id}`, params, {
    next: { revalidate: 3600, tags: ['attribute_detail'] },
  });
}
