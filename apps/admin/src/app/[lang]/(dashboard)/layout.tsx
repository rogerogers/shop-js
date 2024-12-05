import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import Settings from '@/config';
import { auth } from '@/lib/auth';
import { Locale } from '@rogerogers/i18n/request';
import { redirect } from '@rogerogers/i18n/routing';
import { SidebarInset, SidebarProvider } from '@rogerogers/ui/sidebar';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import React from 'react';

export const metadata: Metadata = {
  title: `Dashboard | ${Settings.title}`,
  description: `Dashboard | ${Settings.description}`,
};

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const session = await auth();
  const locale = await getLocale();

  if (session === null) {
    redirect({ href: '/signin', locale: locale });
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar user={session?.user} />
        {/* <Header /> */}
        <SidebarInset>
          <div className="flex flex-col gap-4 p-4 pt-0 h-screen overflow-auto md:w-full w-screen">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
