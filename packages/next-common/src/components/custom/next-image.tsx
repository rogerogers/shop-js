import { cn } from '@rogerogers/ui/lib/utils';
import Image from 'next/image';

export function NextImage(props: {
  src: string;
  sizes?: string;
  className?: string;
  alt?: string;
  placeholder?: string;
  onClick?: () => void;
}) {
  const { src, sizes, className, alt, onClick, placeholder } = props;
  return (
    <Image
      blurDataURL={placeholder ?? undefined}
      placeholder={placeholder ? 'blur' : undefined}
      src={src}
      width={'0'}
      onClick={onClick}
      height={'0'}
      alt={alt ?? 'image'}
      sizes={sizes ?? '50vw'}
      className={cn('w-full h-auto', className)}
      referrerPolicy="no-referrer"
    />
  );
}
