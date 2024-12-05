import { revalidateTag } from 'next/cache';
import { getRequest } from '../lib/fetch/server';
import { isDevelopment } from '../lib/utils';

export async function listPlatformShopifyProduct(params: any) {
  if (isDevelopment()) {
    revalidateTag('platform_shopify_products');
  }
  return await getRequest(`/p1/v1/products/shopify/products`, params, {
    next: { revalidate: 3600 },
    tags: ['platform_shopify_products'],
  });
}
