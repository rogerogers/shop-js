import { getRequest } from '@/lib/fetch/server';
import { isDevelopment } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export async function listThirdPlatforms(params: any) {
  if (isDevelopment()) {
    revalidateTag('third_platforms');
  }
  return await getRequest(`/p1/v1/third/platforms`, params, {
    next: { revalidate: 3600 },
    tags: ['third_platforms'],
  });
}

export async function listThirdApplications(params: any) {
  if (isDevelopment()) {
    revalidateTag('third_applications');
  }
  return await getRequest(`/p1/v1/third/applications`, params, {
    next: { revalidate: 3600 },
    tags: ['third_applications'],
  });
}

export async function listThirdStores(params: any) {
  if (isDevelopment()) {
    revalidateTag('third_stores');
  }
  return await getRequest(`/p1/v1/third/stores`, params, {
    next: { revalidate: 3600 },
    tags: ['third_stores'],
  });
}

export async function listThirdShopifyStores(params: any) {
  if (isDevelopment()) {
    revalidateTag('third_shopify_orders');
  }
  return await getRequest(`/p1/v1/third/shopify/orders`, params, {
    next: { revalidate: 3600 },
    tags: ['third_shopify_orders'],
  });
}
