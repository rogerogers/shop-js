/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest } from '../lib/fetch/server';

export async function listAttribute(params: any) {
  return await getRequest(`/attributes`, params, {
    next: { revalidate: 3600, tags: ['attribute_list'] },
  });
}

export async function listAttributeValue(params: any) {
  return await getRequest(`/attributes`, params, {
    next: { revalidate: 3600, tags: ['attribute_value'] },
  });
}

export async function getAttribute(attribute_id: string, params: any) {
  return await getRequest(`/attributes/${attribute_id}`, params, {
    next: { revalidate: 3600, tags: ['attribute_detail'] },
  });
}
