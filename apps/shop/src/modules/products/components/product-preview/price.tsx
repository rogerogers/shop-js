import { cn } from '@/lib/utils';

export default async function PreviewPrice({ price }: any) {
  return (
    <>
      {price.price_type === 'sale' && (
        <span
          className="line-through text-ui-fg-muted"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
      <span
        className={cn('text-ui-fg-muted', {
          'text-ui-fg-interactive': price.price_type === 'sale',
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </span>
    </>
  );
}
