import { PageFooter } from '@/components/PageFooter';
import { PageHeader } from '@/components/layout/page-header';
import { cn } from '@/lib/utils';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Yoga Apparel & Wear | Best Yoga Clothes Online - rogerogers',
  description: 'Yoga Apparel & Wear | Best Yoga Clothes Online - rogerogers',
  icons: '/assets/buy.png',
};

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ countryCode: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const message = await getMessages();
  return (
    <html lang={params.countryCode} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased lg:container mx-2',
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider messages={message}>
          <PageHeader />
          {children}
          <PageFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
