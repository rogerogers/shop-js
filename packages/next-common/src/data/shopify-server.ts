/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest } from '../lib/fetch/server';

export async function listPlatformShopifyProduct(params: any) {
  return await getRequest(`/p1/v1/products/shopify/products`, params, {
    next: { revalidate: 3600 },
    tags: ['platform_shopify_products'],
  });
}
