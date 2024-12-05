import { cn } from '@/lib/utils';
import Image from 'next/image';

interface NextImageProps {
  src: string;
  sizes?: string;
  classs?: string;
  className?: string;
  alt?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

const NextImage = (props: NextImageProps) => {
  const { src, sizes, classs, className, alt, onClick, onMouseEnter } = props;
  return (
    <Image
      src={src}
      width={'0'}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      height={'0'}
      alt={alt ?? 'image'}
      sizes={sizes ?? '50vw'}
      className={cn(className, classs ?? 'w-full h-auto')}
      referrerPolicy="no-referrer"
    />
  );
};

export default NextImage;
