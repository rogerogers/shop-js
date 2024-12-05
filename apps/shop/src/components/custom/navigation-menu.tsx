// @ts-nocheck
import { Root, Viewport } from '@radix-ui/react-navigation-menu';
import * as React from 'react';

import { cn } from '@/lib/utils';

const CustomNavigationMenu = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <Root
      style={{ scrollbarWidth: 'none' }}
      ref={ref}
      className={cn(
        'relative z-10 flex flex-1 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
    </Root>
  ),
);
CustomNavigationMenu.displayName = Root.displayName;

const CustomCenterNavigationMenuViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        'absolute left-1/2 -translate-x-1/2 top-full flex justify-center',
      )}
    >
      <Viewport
        className={cn(
          'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  ),
);
CustomCenterNavigationMenuViewport.displayName = Viewport.displayName;

export { CustomCenterNavigationMenuViewport, CustomNavigationMenu };
