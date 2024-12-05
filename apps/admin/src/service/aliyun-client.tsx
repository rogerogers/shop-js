import { postRequest } from '@/lib/fetch/client';
const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3081/api';

export async function createAliyunStsToken() {
  return await postRequest(`${apiHost}/aliyun/sts/token`, undefined, {});
}
