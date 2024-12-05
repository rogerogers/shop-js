// @ts-nocheck
import LocalizedClientLink from '@/modules/common/components/localized-client-link';

const ProductInfo = ({ product }) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <h2
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </h2>

        <span
          className="text-medium text-ui-fg-subtle"
          data-testid="product-description"
        >
          {product.description}
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
