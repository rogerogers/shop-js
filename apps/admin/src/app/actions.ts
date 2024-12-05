'use server';

import { addAuthWhitelist } from '@/data/auth-server';
import { signIn, signOut } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function signOutAction() {
  await signOut();
}

export async function signInGithubAction() {
  await signIn('github', { redirectTo: '/dashboard' });
}

export async function signInFeishuAction() {
  await signIn('feishu', { redirectTo: '/dashboard' });
}

type AuthWhitelist = {
  email: string;
  expired_at?: string;
  password_authentication?: boolean;
  password?: string;
};

export async function addAuthWhitelistAction({
  email,
  expired_at,
  password_authentication,
  password,
}: AuthWhitelist) {
  const resp = await addAuthWhitelist({
    email,
    expired_at,
    password_authentication,
    password,
  });
  if (!resp.success) {
    return resp;
  }
  revalidatePath('/[lang]/(dashboard)/users/whitelist', 'page');
  return { success: true };
}
