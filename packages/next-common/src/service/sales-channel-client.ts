import { postRequest, putRequest } from '@/lib/fetch/client';
const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3081/api';
export async function createSalesChannel(body: any) {
  return await postRequest(
    `${apiHost}/sales-channels`,
    { sales_channel: body },
    {},
  );
}

export async function updateSalesChannel(id: number, body: any) {
  return await putRequest(
    `${apiHost}/sales-channels/${id}`,
    { sales_channel: body },
    {},
  );
}
