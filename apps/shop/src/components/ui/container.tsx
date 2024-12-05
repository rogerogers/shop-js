import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

const Container = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg px-9 pb-8 pt-6',
        className
      )}
      {...props}
    />
  );
});
Container.displayName = 'Container';

export { Container };
