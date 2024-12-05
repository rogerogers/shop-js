// @ts-nocheck
'use client';

import { Button } from '@/components/ui/button';
import { isEqual } from 'lodash';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

// import { useIntersection } from '@/lib/hooks/use-in-view';
// import { addToCart } from '@/modules/cart/actions';
import { Separator } from '@/components/ui/separator';
import OptionSelect from '@/modules/products/components/option-select-sha';

import MobileActions from '../mobile-actions';
import ProductPrice from '../product-price';

export default function ProductActions({ product, region, disabled }) {
  const [options, setOptions] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const countryCode = useParams().countryCode;

  const variants = product.variants;

  // initialize the option state
  useEffect(() => {
    const optionObj = {};

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined });
    }

    setOptions(optionObj);
  }, [product]);

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map = {};

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue;

      const temp = {};

      for (const option of variant.options) {
        temp[option.option_id] = option.value;
      }

      map[variant.id] = temp;
    }

    return map;
  }, [variants]);

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId = undefined;

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key;
      }
    }

    return variants.find((v) => v.id === variantId);
  }, [options, variantRecord, variants]);

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id]);
    }
  }, [variants, variantRecord]);

  // update the options when a variant is selected
  const updateOptions = (update) => {
    setOptions({ ...options, ...update });
  };

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (variant && !variant.manage_inventory) {
      return true;
    }

    // If we allow back orders on the variant, we can add to cart
    if (variant && variant.allow_backorder) {
      return true;
    }

    // If there is inventory available, we can add to cart
    if (variant?.inventory_quantity && variant.inventory_quantity > 0) {
      return true;
    }

    // Otherwise, we can't add to cart
    return false;
  }, [variant]);

  const actionsRef = useRef(null);

  // const inView = useIntersection(actionsRef, '0px');

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id) return null;

    setIsAdding(true);

    // TODO: Add to cart
    // await addToCart({
    //   variantId: variant.id,
    //   quantity: 1,
    //   countryCode
    // });

    setIsAdding(false);
  };

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        {product.variants.length > 1 && (
          <div className="flex flex-col gap-y-4 lg:ps-10">
            {(product.options || []).map((option, index) => {
              return (
                <div key={option.id}>
                  <OptionSelect
                    last={index == product.options.length - 1}
                    option={option}
                    current={options[option.id]}
                    updateOption={updateOptions}
                    title={option.title}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />
                </div>
              );
            })}
            <Separator />
          </div>
        )}

        <ProductPrice product={product} variant={variant} region={region} />

        <Button
          // TODO add cart action
          onClick={() => {
            console.log(variant);
          }}
          disabled={!inStock || !variant || !!disabled || isAdding}
          variant="primary"
          className="w-full h-10"
          // isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!variant
            ? 'Select variant'
            : !inStock
              ? 'Out of stock'
              : 'Add to cart'}
        </Button>
        <MobileActions
          product={product}
          variant={variant}
          region={region}
          options={options}
          updateOptions={updateOptions}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          // show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  );
}
