import NextImage from '@/components/NextImage';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
const PadNavigation = ({ mdOptionsToggle }: { mdOptionsToggle: boolean }) => {
  return (
    <div
      id="md-searchbar"
      className={`${
        mdOptionsToggle ? 'hidden' : 'flex'
      } bg-white dark:bg-gray-900 hidden py-5 px-6 items-center justify-between`}
    >
      <div className="flex items-center space-x-3 text-gray-800 dark:text-white">
        <div>
          <Link href="/">
            <NextImage src="/assets/buy.png" />
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search for products"
          className="text-sm leading-none dark:text-gray-300 dark:bg-gray-900 text-gray-600 focus:outline-none"
        />
      </div>
      <div className="space-x-6">
        <button
          aria-label="view favourites"
          className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
        >
          <Heart />
        </button>
        <button
          aria-label="go to cart"
          className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
        >
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
};

export { PadNavigation };
