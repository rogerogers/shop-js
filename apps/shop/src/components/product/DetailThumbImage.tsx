import { cn } from '@/lib/utils';
import React from 'react';
import NextImage from '../NextImage';

type Props = {
  selected: boolean;
  index: string;
  onClick: () => void;
  onMouseEnter: () => void;
};

export const DetailThumbImage = React.forwardRef((props: any) => {
  const { selected, index, onClick, onMouseEnter } = props;
  return (
    <div className="flex-1 mb-5">
      <NextImage
        className={cn(
          'rounded-md',
          selected
            ? 'border-2 border-primary'
            : 'border-2 border-ui-border-base',
        )}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        key={index}
        alt="ecommerce"
        src={index}
      />
    </div>
  );
});

DetailThumbImage.displayName = 'DetailThumbImage';
