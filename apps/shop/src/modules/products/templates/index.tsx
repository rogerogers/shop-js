// @ts-nocheck
import { Suspense } from 'react';

import DetailImage from '@/components/product/DetailImage';
import ProductActions from '@/modules/products/components/product-actions';
import ProductOnboardingCta from '@/modules/products/components/product-onboarding-cta';
import ProductTabs from '@/modules/products/components/product-tabs';
import ProductInfo from '@/modules/products/templates/product-info';
import SkeletonRelatedProducts from '@/modules/skeletons/templates/skeleton-related-products';
import { notFound } from 'next/navigation';
import ProductActionsWrapper from './product-actions-wrapper';

const ProductTemplate = ({ product, region, countryCode }) => {
  if (!product || !product.id) {
    return notFound();
  }

  return (
    <>
      <div
        className="container flex flex-col lg:flex-row lg:items-start py-6 relative"
        data-testid="product-container"
      >
        <div className="block w-full lg:px-8 relative">
          <DetailImage
            slides={product?.images.map((item) => item.url) || []}
            options={{}}
          />
        </div>
        <div className="flex flex-col lg:sticky lg:top-48 lg:py-0 lg:max-w-[600px] w-full py-8 lg:gap-y-12">
          <ProductInfo product={product} />
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
          <ProductTabs product={product} />
        </div>
      </div>
      <div
        className="container my-16 lg:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          {/* <RelatedProducts product={product} countryCode={countryCode} /> */}
        </Suspense>
      </div>
    </>
  );
};

export default ProductTemplate;
