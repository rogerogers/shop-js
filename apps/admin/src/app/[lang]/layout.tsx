import Settings from '@/config';
import { Toaster } from '@rogerogers/ui/toaster';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: Settings.title,
  description: Settings.description,
};

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const {
    children
  } = props;

  const message = await getMessages();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} xl:overflow-hidden min-h-screen`}>
        <NextIntlClientProvider messages={message}>
          <Toaster />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
