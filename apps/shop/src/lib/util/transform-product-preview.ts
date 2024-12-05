import { getPercentageDiff } from '@/lib/util/get-precentage-diff';
import { formatAmount } from '@/lib/util/prices';

const transformProductPreview = (product: any, region: string) => {
  const variants = product.variants;

  let cheapestVariant = undefined;

  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((acc: any, curr: any) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr;
      }
      return acc;
    }, variants[0]);
  }

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    thumbnail: product.thumbnail,
    created_at: product.created_at,
    price: cheapestVariant
      ? {
          calculated_price: formatAmount({
            amount: cheapestVariant.calculated_price,
            region: region,
            includeTaxes: false,
          }),
          original_price: formatAmount({
            amount: cheapestVariant.original_price,
            region: region,
            includeTaxes: false,
          }),
          difference: getPercentageDiff(
            cheapestVariant.original_price,
            cheapestVariant.calculated_price,
          ),
          price_type: cheapestVariant.calculated_price_type,
        }
      : undefined,
  };
};

export default transformProductPreview;
