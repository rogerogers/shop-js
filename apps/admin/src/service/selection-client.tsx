import { getRequest } from '@/lib/fetch/client';

const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3081/api';

export async function getSelectionProductDetail(params: any) {
  return await getRequest(`${apiHost}/p1/v1/ali/product/detail`, params, {});
}

export async function getSelectionProductSellPerDay(offerId: number) {
  return await getRequest(
    `${apiHost}/p1/v1/ali/product/sell/per-day`,
    {
      offer_id: offerId,
    },
    {},
  );
}

export async function getSelectionRepurchaseRate(offerId: number) {
  return await getRequest(
    `${apiHost}/p1/v1/ali/product/repurchase-rate`,
    {
      offer_id: offerId,
    },
    {},
  );
}
