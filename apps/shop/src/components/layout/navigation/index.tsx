'use client';

import NextImage from '@/components/NextImage';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@rogerogers/i18n/routing';
import { Button } from '@rogerogers/ui/button';
import { ScrollArea, ScrollBar } from '@rogerogers/ui/scroll-area';
import { Menu, Search, SearchIcon, ShoppingCart } from 'lucide-react';
import { forwardRef, useState } from 'react';
import LanguageSwitcher from '../language-switcher';
import { MobileNavigation } from '../mobile-navigation';
import { PadNavigation } from '../pad-navigation';
import { Profile } from '../profile';

const components = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

export function Navigation({
  mdOptionsToggle,
  setMdOptionsToggle,
  setShowMenu,
}: {
  mdOptionsToggle: boolean;
  setMdOptionsToggle: any;
  setShowMenu: any;
}) {
  const [searchInput, setSearchInput] = useState(true);
  const pathname = usePathname();
  return (
    <div className="py-3 md:py-9">
      <div className="md:px-8 px-2 mx-auto flex items-center justify-between">
        <div
          className="md:w-3/12 cursor-pointer text-gray-800 dark:text-white"
          aria-label="the Crib."
        >
          <Link href={'/'}>
            <NextImage src="/assets/buy.png" sizes="49vw" classs="w-10" />
          </Link>
        </div>
        <div className="md:w-3/12 hidden md:block">
          <div className="hidden md:flex items-center">
            <Input
              id="searchInput"
              type="text"
              placeholder="search"
              className={`text-sm dark:bg-gray-901 dark:placeholder-gray-300 text-gray-600 rounded ml-1 border outline-gray-50 focus:outline-none focus:border-gray-400 px-1 z-20 pl-4 focus-visible:ring-0`}
            />
            <Button
              onClick={() => setSearchInput(!searchInput)}
              type="submit"
              aria-label="search items"
              className="text-gray-801 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 -translate-x-1"
            >
              <SearchIcon className="text-white" />
            </Button>
          </div>
        </div>

        <div className="md:w-3/12 justify-end flex items-center space-x-1 xl:space-x-8">
          <div className="relative md:hidden">
            <Input
              type="search"
              className="ml-8"
              placeholder="swim suite"
            ></Input>
            <Search className="absolute left-1 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex md:hidden">
            <Button
              aria-label="show options"
              onClick={() => setMdOptionsToggle(!mdOptionsToggle)}
              className="text-black dark:text-white dark:hover:text-gray-301 hidden md:flex focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
            >
              <Menu />
            </Button>
            <Button
              aria-label="open menu"
              onClick={() => setShowMenu(true)}
              className="text-black dark:text-white dark:hover:text-gray-301 md:hidden focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
            >
              <Menu />
            </Button>
          </div>
          <Profile />
          <LanguageSwitcher />
          <Link href={'/cart'}>
            <div className="flex items-center space-x-3">
              <ShoppingCart />
              <div className="text-center hidden lg:block">Cart</div>
            </div>
          </Link>
        </div>
      </div>
      <NavigationMenu
        // defaultValue={'best-sellers'}
        // value={'best-sellers'}
        className={cn(
          'hidden md:flex pt-4 justify-start items-start max-w-screen',
        )}
      >
        <ScrollArea>
          <NavigationMenuList className="items-start justify-start">
            <NavigationMenuItem value={'Categories'}>
              <NavigationMenuTrigger>Best Sellers </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-content lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value={'5-star-rated'}>
              <NavigationMenuTrigger>New in</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-content">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value={'new-arrivals'}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
                active={pathname == '/collections/best-sellers'}
              >
                <Link href="/collections/best-sellers">Best sellers</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
                active={pathname == '/collections/push-for-25ss'}
              >
                <Link href="/collections/push-for-25ss">Push for 25SS</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem value={'categories'}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
                active={pathname == '/collections/collections'}
              >
                <Link href="/collections/collections">Collections</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem value={'categories'}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
                active={pathname == '/collections/2024-fw'}
              >
                <Link href="/collections/2024-fw">2024 F&W</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem value={'categories'}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
                active={pathname == '/collections/restocked'}
              >
                <Link href="/collections/restocked">Restocked</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem value={'categories'}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
                active={pathname == '/collections/pre-sale'}
              >
                <Link href="/collections/pre-sale">Pre-sale</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem value={'categories'}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
                active={pathname == '/collections/dropshopping-picks'}
              >
                <Link href="/collections/dropshopping-picks">
                  DropShopping Picks
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <ScrollBar orientation="horizontal" className="h-0" />
        </ScrollArea>
      </NavigationMenu>
    </div>
  );
}

// todo set type
const ListItem = forwardRef<HTMLAnchorElement, any>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={props.href}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';

export { MobileNavigation, PadNavigation };
