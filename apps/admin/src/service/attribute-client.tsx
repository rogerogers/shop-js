import { postRequest } from '@/lib/fetch/client';

const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3081/api';

export async function createAttribute(body: any) {
  return await postRequest(`${apiHost}/attributes`, body, {});
}

export async function createAttributeValue(body: any) {
  return await postRequest(`${apiHost}/attributes/values`, body, {});
}
