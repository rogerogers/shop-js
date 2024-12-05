// @ts-nocheck
import {
  CustomCenterNavigationMenuViewport,
  CustomNavigationMenu,
} from '@/components/custom/navigation-menu';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex items-center">
      <CustomNavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="profile">
            <NavigationMenuTrigger>
              <User />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="-left-1">
              <div className="px-6 pt-6">
                User && Profile
                <Separator />
              </div>
              <ul className="w-[200px] p-6 rounded-sm space-y-6">
                <li>
                  <NavigationMenuLink asChild>
                    <div className="flex">
                      <User /> Profile
                    </div>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <div className="flex">
                      <User /> Profile
                    </div>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <div className="flex">
                      <User /> Profile
                    </div>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <div className="flex">
                      <User /> Profile
                    </div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <CustomCenterNavigationMenuViewport />
      </CustomNavigationMenu>
    </div>
  );
};

export { Profile };
