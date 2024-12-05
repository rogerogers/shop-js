// @ts-nocheck
import { getProductByHandle } from '@/lib/data';
import ProductActions from '@/modules/products/components/product-actions';

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default async function ProductActionsWrapper({ id, region }) {
  const { product } = await getProductByHandle(id);

  if (!product) {
    return null;
  }

  return <ProductActions product={product} region={region} />;
}
