import { getRequest } from '@/lib/fetch/server';

export async function listThirdPlatforms(params: any) {
  return await getRequest(`/p1/v1/third/platforms`, params, {
    next: { revalidate: 3600 },
    tags: ['third_platforms'],
  });
}

export async function listThirdApplications(params: any) {
  return await getRequest(`/p1/v1/third/applications`, params, {
    next: { revalidate: 3600 },
    tags: ['third_applications'],
  });
}

export async function listThirdStores(params: any) {
  return await getRequest(`/p1/v1/third/stores`, params, {
    next: { revalidate: 3600 },
    tags: ['third_stores'],
  });
}

export async function listThirdShopifyStores(params: any) {
  return await getRequest(`/p1/v1/third/shopify/orders`, params, {
    next: { revalidate: 3600 },
    tags: ['third_shopify_orders'],
  });
}
