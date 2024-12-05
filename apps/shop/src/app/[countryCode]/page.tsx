import { Banner } from '@/components/modules/home/banner';
import { FlashSale } from '@/components/modules/home/flash-sale';
import Recommend from '@/components/modules/home/recommend';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - rogerogers',
  keywords: ['rogerogers', 'online shopping', 'e-commerce'],
  description: 'online shopping - rogerogers',
  icons: '/assets/buy.png',
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Banner />
      <Separator className="mt-10" />
      <FlashSale />
      <Recommend />
    </main>
  );
}
