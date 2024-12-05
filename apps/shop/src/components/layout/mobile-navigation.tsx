import { Button } from '@rogerogers/ui/button';
import { ChevronRight, Heart, Search, ShoppingCart, X } from 'lucide-react';
const MobileNavigation = ({
  setShowMenu,
  showMenu,
}: {
  setShowMenu: any;
  showMenu: boolean;
}) => {
  return (
    <div
      id="mobile-menu"
      className={`${
        showMenu ? 'flex' : 'hidden'
      } absolute dark:bg-gray-901 z-10 inset-0 md:hidden bg-white flex-col h-screen w-full`}
    >
      <div className="flex items-center justify-between border-b border-gray-201 dark:border-gray-700 pb-4 p-4">
        <div className="flex items-center space-x-4">
          <div>
            <Search />
          </div>
          <input
            type="text"
            placeholder="Search for products"
            className="text-sm dark:bg-gray-901 text-gray-600 placeholder-gray-600 dark:placeholder-gray-300 focus:outline-none"
          />
        </div>
        <Button
          onClick={() => setShowMenu(false)}
          aria-label="close menu"
          className="focus:outline-none focus:ring-3 rounded focus:ring-gray-600"
        >
          <X />
        </Button>
      </div>
      <div className="mt-7 p-4">
        <ul className="flex flex-col space-y-7">
          <li>
            <span className="dark:text-white flex items-center justify-between hover:underline text-base text-gray-801 focus:outline-none focus:ring-2 focus:ring-gray-800">
              Best Sellers
              <div>
                <ChevronRight />
              </div>
            </span>
          </li>
          <li>
            <span className="dark:text-white flex items-center justify-between hover:underline text-base text-gray-801 focus:outline-none focus:ring-2 focus:ring-gray-800">
              4-Star Rated
              <div>
                <ChevronRight />
              </div>
            </span>
          </li>
          <li>
            <span className="dark:text-white flex items-center justify-between hover:underline text-base text-gray-801 focus:outline-none focus:ring-2 focus:ring-gray-800">
              New Arrivals
              <div>
                <ChevronRight />
              </div>
            </span>
          </li>
          <li>
            <span className="dark:text-white flex items-center justify-between hover:underline text-base text-gray-801 focus:outline-none focus:ring-2 focus:ring-gray-800">
              Categories
              <div>
                <ChevronRight />
              </div>
            </span>
          </li>
        </ul>
      </div>
      <div className="h-full flex items-end">
        <ul className="flex flex-col space-y-9 bg-gray-50 w-full py-10 p-4 dark:bg-gray-800">
          <li>
            <span className="dark:text-white text-gray-801 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
              <div>
                <ShoppingCart />
              </div>
              <p className="text-base">Cart</p>
            </span>
          </li>
          <li>
            <span className="dark:text-white text-gray-801 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
              <div>
                <Heart />
              </div>
              <p className="text-base">Wishlist</p>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export { MobileNavigation };
