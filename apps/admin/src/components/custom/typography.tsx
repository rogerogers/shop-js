import { cn } from '@/lib/utils';
import React from 'react';
interface ModalProps {
  className?: string;
  children?: React.ReactNode;
}
const TypographyH1: React.FC<ModalProps> = ({ className, children }) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl',
        className,
      )}
    >
      {children}
    </h1>
  );
};

export { TypographyH1 };
