import { getRequest, postRequest } from '@/lib/fetch/server';
import { isDevelopment } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export async function authSigninAllowed(params: any) {
  if (isDevelopment()) {
    revalidateTag('auth_signin_allowed');
  }
  return await getRequest(`/auth/signin/allowed`, params, {
    next: { revalidate: 3600, tags: ['auth_signin_allowed'] },
  });
}

export async function authWhitelist(params: any) {
  // if (isDevelopment()) {
  //   revalidateTag('auth_whitelist');
  // }
  return await getRequest(`/auth/whitelist`, params, {
    next: { revalidate: 3600, tags: ['auth_whitelist'] },
  });
}

export async function addAuthWhitelist(body: any) {
  return await postRequest(`/auth/whitelist`, body, {});
}

export async function login(body: any) {
  return await postRequest(`/auth/login`, body, {});
}
