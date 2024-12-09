import UserAuthForm from '@/components/forms/user-auth-form';
import Settings from '@/config';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { redirect } from '@rogerogers/i18n/routing';
import { NextImage } from '@rogerogers/next-common/custom/next-image';
import { buttonVariants } from '@rogerogers/ui/button';
import { Skeleton } from '@rogerogers/ui/skeleton';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: `Login page - ${Settings.title}`,
  description: `Login page of oms - ${Settings.title}`,
};

export default async function AuthenticationPage() {
  const session = await auth();
  const referer = (await headers()).get('referer');
  let redirectPath = '/dashboard';
  const locale = await getLocale();
  if (referer) {
    const refererUrl = new URL(referer);
    if (
      ['localhost:3080', 'admin.rogerogers.com'].includes(refererUrl.host) &&
      !refererUrl.pathname.endsWith('/signin')
    ) {
      redirectPath = refererUrl.pathname;
    }
  }

  if (session !== null && session?.user?.email?.endsWith('@rogerogers.com')) {
    redirect({ href: '/dashboard', locale: locale });
  }
  const t = await getTranslations('Login');
  return (
    <div className="relative h-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 pt-14">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 hidden top-4 md:right-8 md:top-8',
        )}
      >
        Login
      </Link>
      <div
        className={cn(
          'relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex',
        )}
      >
        <NextImage src={'/assets/k8s.png'} className="w-full" />
        <div className="absolute inset-0" />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 text-zinc-900 dark:text-zinc-100 ">
            <p className="text-lg">&ldquo;Make world better.&rdquo;</p>
            <footer className="text-sm">David Rogers</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('message')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('description')}</p>
          </div>
          <Suspense
            fallback={
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            }
          >
            <UserAuthForm redirectPath={redirectPath} />
          </Suspense>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>
            {' and '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
