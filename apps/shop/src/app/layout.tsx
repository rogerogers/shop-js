import { Inter as FontSans } from 'next/font/google';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Yoga Apparel & Wear | Best Yoga Clothes Online - rogerogers',
  description: 'Yoga Apparel & Wear | Best Yoga Clothes Online - rogerogers',
  icons: '/assets/buy.png',
};

export default function RootLayout({ children }: any) {
  return children;
}
