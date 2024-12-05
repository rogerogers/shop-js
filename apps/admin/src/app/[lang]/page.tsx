import { redirect } from '@rogerogers/i18n/routing';
import { getLocale } from 'next-intl/server';
export default async function Page() {
  const locale = await getLocale();

  redirect({ href: '/dashboard', locale: locale });
}
