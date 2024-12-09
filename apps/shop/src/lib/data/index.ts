// @ts-nocheck
import { cache } from 'react';

import { deleteRequest, getRequest, postRequest } from '@/lib/client/common';
import sortProducts from '@/lib/util/sort-products';
import transformProductPreview from '@/lib/util/transform-product-preview';

import medusaError from '@/lib/util/medusa-error';
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';

const emptyResponse = {
  response: { products: [], count: 0 },
  nextPage: null,
};

/**
 * Function for getting custom headers for Medusa API requests, including the JWT token and cache revalidation tags.
 *
 * @param tags
 * @returns custom headers for Medusa API requests
 */
const getMedusaHeaders = (tags) => {
  const headers = {
    next: {
      tags,
    },
  };

  const token = (cookies() as unknown as UnsafeUnwrappedCookies).get('_medusa_jwt')?.value;

  if (token) {
    headers.authorization = `Bearer ${token}`;
  } else {
    headers.authorization = '';
  }

  return headers;
};

// Cart actions
export async function createCart(data = {}) {
  const headers = getMedusaHeaders(['cart']);

  return postRequest('/store/carts', data, { headers: headers })
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function updateCart(cartId, data) {
  const headers = getMedusaHeaders(['cart']);

  return postRequest(`/store/carts/${cartId}`, data, { headers: headers })
    .then(({ cart }) => cart)
    .catch((error) => medusaError(error));
}

export const getCart = cache(async function (cartId) {
  const headers = getMedusaHeaders(['cart']);

  return getRequest(`/store/carts/${cartId}`, {}, { headers: headers })
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
});

export async function addItem({ cartId, variantId, quantity }) {
  const headers = getMedusaHeaders(['cart']);

  return postRequest(
    `/store/carts/${cartId}/line-items`,
    { variant_id: variantId, quantity },
    { headers: headers },
  )
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function updateItem({ cartId, lineId, quantity }) {
  const headers = getMedusaHeaders(['cart']);

  return postRequest(
    `/store/carts/${cartId}/line-items/${lineId}`,
    { quantity },
    { headers: headers },
  )
    .then(({ cart }) => cart)
    .catch((err) => medusaError(err));
}

export async function removeItem({ cartId, lineId }) {
  const headers = getMedusaHeaders(['cart']);

  return deleteRequest(`/store/carts/${cartId}/line-items/${lineId}`, {
    headers: headers,
  })
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function deleteDiscount(cartId, code) {
  const headers = getMedusaHeaders(['cart']);

  return deleteRequest(`/store/carts/${cartId}/discounts/${code}`, {
    headers: headers,
  })
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function createPaymentSessions(cartId) {
  const headers = getMedusaHeaders(['cart']);

  return medusaClient.carts
    .createPaymentSessions(cartId, headers)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function setPaymentSession({ cartId, providerId }) {
  const headers = getMedusaHeaders(['cart']);

  return medusaClient.carts
    .setPaymentSession(cartId, { provider_id: providerId }, headers)
    .then(({ cart }) => cart)
    .catch((err) => medusaError(err));
}

export async function completeCart(cartId) {
  const headers = getMedusaHeaders(['cart']);

  return medusaClient.carts
    .complete(cartId, headers)
    .then((res) => res)
    .catch((err) => medusaError(err));
}

// Order actions
export const retrieveOrder = cache(async function (id) {
  const headers = getMedusaHeaders(['order']);

  return medusaClient.orders
    .retrieve(id, headers)
    .then(({ order }) => order)
    .catch((err) => medusaError(err));
});

// Shipping actions
export const listCartShippingMethods = cache(async function (cartId) {
  const headers = getMedusaHeaders(['shipping']);

  return medusaClient.shippingOptions
    .listCartOptions(cartId, headers)
    .then(({ shipping_options }) => shipping_options)
    .catch((err) => {
      console.log(err);
      return null;
    });
});

export async function addShippingMethod({ cartId, shippingMethodId }) {
  const headers = getMedusaHeaders(['cart']);

  return medusaClient.carts
    .addShippingMethod(cartId, { option_id: shippingMethodId }, headers)
    .then(({ cart }) => cart)
    .catch((err) => medusaError(err));
}

// Authentication actions
export async function getToken(credentials) {
  return medusaClient.auth
    .getToken(credentials, {
      next: {
        tags: ['auth'],
      },
    })
    .then(({ access_token }) => {
      access_token &&
        (cookies() as unknown as UnsafeUnwrappedCookies).set('_medusa_jwt', access_token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });
      return access_token;
    })
    .catch((err) => {
      throw new Error('Wrong email or password.');
    });
}

export async function authenticate(credentials) {
  const headers = getMedusaHeaders(['auth']);

  return medusaClient.auth
    .authenticate(credentials, headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err));
}

export const getSession = cache(async function getSession() {
  const headers = getMedusaHeaders(['auth']);

  return medusaClient.auth
    .getSession(headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err));
});

// Customer actions
export async function getCustomer() {
  const headers = getMedusaHeaders(['customer']);

  return medusaClient.customers
    .retrieve(headers)
    .then(({ customer }) => customer)
    .catch((err) => null);
}

export async function createCustomer(data) {
  const headers = getMedusaHeaders(['customer']);

  return medusaClient.customers
    .create(data, headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err));
}

export async function updateCustomer(data) {
  const headers = getMedusaHeaders(['customer']);

  return medusaClient.customers
    .update(data, headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err));
}

export async function addShippingAddress(data) {
  const headers = getMedusaHeaders(['customer']);

  return medusaClient.customers.addresses
    .addAddress(data, headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err));
}

export async function deleteShippingAddress(addressId) {
  const headers = getMedusaHeaders(['customer']);

  return medusaClient.customers.addresses
    .deleteAddress(addressId, headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err));
}

export async function updateShippingAddress(addressId, data) {
  const headers = getMedusaHeaders(['customer']);

  return medusaClient.customers.addresses
    .updateAddress(addressId, data, headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err));
}

export const listCustomerOrders = cache(async function (
  limit = 10,
  offset = 0,
) {
  const headers = getMedusaHeaders(['customer']);

  return medusaClient.customers
    .listOrders({ limit, offset }, headers)
    .then(({ orders }) => orders)
    .catch((err) => medusaError(err));
});

// Region actions
export const listRegions = cache(async function () {
  return getRequest('/store/regions')
    .then(({ regions }) => regions)
    .catch((err) => {
      console.log(err);
      return null;
    });
});

export const retrieveRegion = cache(async function (id) {
  const headers = getMedusaHeaders(['regions']);

  return medusaClient.regions
    .retrieve(id, headers)
    .then(({ region }) => region)
    .catch((err) => medusaError(err));
});

const regionMap = {};

export const getRegion = cache(async function (countryCode) {
  try {
    if (regionMap[countryCode]) {
      return regionMap[countryCode];
    }

    const regions = await listRegions();

    if (!regions) {
      return null;
    }

    regions.forEach((region) => {
      region.countries.forEach((c) => {
        regionMap[c.iso_2] = region;
      });
    });

    const region = countryCode ? regionMap[countryCode] : regionMap['us'];

    return region;
  } catch (e) {
    console.log(e.toString());
    return null;
  }
});

// Product actions
export const getProductsById = cache(async function ({ ids, regionId }) {
  const headers = getMedusaHeaders(['products']);

  return getRequest(
    `/store/products/{ids}`,
    { regionId: regionId },
    { headers: headers },
  )
    .then(({ products }) => products)
    .catch((err) => {
      console.log(err);
      return null;
    });
});

export const retrievePricedProductById = cache(async function ({
  id,
  regionId,
}) {
  const headers = getMedusaHeaders(['products']);

  return getRequest(
    `/store/products/${id}`,
    { region_id: regionId },
    { headers: headers },
  )
    .then(({ product }) => product)
    .catch((err) => {
      console.log(err);
      return null;
    });
});

export const getProductByHandle = async function (handle) {
  const headers = getMedusaHeaders(['products']);

  const product = await getRequest(
    `/store/products/abc`,
    { handle: handle },
    { headers: headers },
  )
    .then((product) => {
      return product;
    })
    .catch((err) => {
      throw err;
    });

  return product;
};

export const getProductsList = cache(async function ({
  pageParam = 0,
  queryParams,
  countryCode,
}) {
  const limit = queryParams?.limit || 12;

  const region = await getRegion(countryCode);

  if (!region) {
    return emptyResponse;
  }

  const { products, count } = await getRequest(
    `/store/products`,
    {
      limit,
      offset: pageParam,
      region_id: region.id,
      ...queryParams,
    },
    { headers: { next: { tags: ['products'] } } },
  )
    .then((res) => res)
    .catch((err) => {
      throw err;
    });

  const transformedProducts = products.map((product) => {
    return transformProductPreview(product, region);
  });

  const nextPage = count > pageParam + 1 ? pageParam + 1 : null;

  return {
    response: { products: transformedProducts, count },
    nextPage,
    queryParams,
  };
});

export const getProductsListWithSort = cache(
  async function getProductsListWithSort({
    page = 0,
    queryParams,
    sortBy = 'created_at',
    countryCode,
  }) {
    const limit = queryParams?.limit || 12;

    const {
      response: { products, count },
    } = await getProductsList({
      pageParam: 0,
      queryParams: {
        ...queryParams,
        limit: 100,
      },
      countryCode,
    });

    const sortedProducts = sortProducts(products, sortBy);

    const pageParam = (page - 1) * limit;

    const nextPage = count > pageParam + limit ? pageParam + limit : null;

    const paginatedProducts = sortedProducts.slice(
      pageParam,
      pageParam + limit,
    );

    return {
      response: {
        products: paginatedProducts,
        count,
      },
      nextPage,
      queryParams,
    };
  },
);

export const getHomepageProducts = cache(async function getHomepageProducts({
  collectionHandles,
  currencyCode,
  countryCode,
}) {
  const collectionProductsMap = new Map();

  const { collections } = await getCollectionsList(0, 3);

  if (!collectionHandles) {
    collectionHandles = collections.map((collection) => collection.handle);
  }

  for (const handle of collectionHandles) {
    const products = await getProductsByCollectionHandle({
      handle,
      currencyCode,
      countryCode,
      limit: 3,
    });
    collectionProductsMap.set(handle, products.response.products);
  }

  return collectionProductsMap;
});

// Collection actions
export const retrieveCollection = cache(async function (id) {
  return medusaClient.collections
    .retrieve(id, {
      next: {
        tags: ['collections'],
      },
    })
    .then(({ collection }) => collection)
    .catch((err) => {
      throw err;
    });
});

export const getCollectionsList = cache(async function (
  offset = 0,
  limit = 100,
) {
  const collections = await medusaClient.collections
    .list({ limit, offset }, { next: { tags: ['collections'] } })
    .then(({ collections }) => collections)
    .catch((err) => {
      throw err;
    });

  const count = collections.length;

  return {
    collections,
    count,
  };
});

export const getCollectionByHandle = cache(async function (handle) {
  const collection = await medusaClient.collections
    .list({ handle: [handle] }, { next: { tags: ['collections'] } })
    .then(({ collections }) => collections[0])
    .catch((err) => {
      throw err;
    });

  return collection;
});

export const getProductsByCollectionHandle = cache(
  async function getProductsByCollectionHandle({
    pageParam = 0,
    limit = 100,
    handle,
    countryCode,
  }) {
    const { id } = await getCollectionByHandle(handle).then(
      (collection) => collection,
    );

    const { response, nextPage } = await getProductsList({
      pageParam,
      queryParams: { collection_id: [id], limit },
      countryCode,
    })
      .then((res) => res)
      .catch((err) => {
        throw err;
      });

    return {
      response,
      nextPage,
    };
  },
);

// Category actions
export const listCategories = cache(async function () {
  const headers = {
    next: {
      tags: ['collections'],
    },
  };

  return medusaClient.productCategories
    .list({ expand: 'category_children' }, headers)
    .then(({ product_categories }) => product_categories)
    .catch((err) => {
      throw err;
    });
});

export const getCategoriesList = cache(async function (
  offset = 0,
  limit = 100,
) {
  const { product_categories, count } = await medusaClient.productCategories
    .list({ limit, offset }, { next: { tags: ['categories'] } })
    .catch((err) => {
      throw err;
    });

  return {
    product_categories,
    count,
  };
});

export const getCategoryByHandle = cache(async function (categoryHandle) {
  const handles = categoryHandle.map((handle, index) =>
    categoryHandle.slice(0, index + 1).join('/'),
  );

  const product_categories = [];

  for (const handle of handles) {
    const category = await medusaClient.productCategories
      .list(
        {
          handle: handle,
        },
        {
          next: {
            tags: ['categories'],
          },
        },
      )
      .then(({ product_categories: { [0]: category } }) => category)
      .catch((err) => {
        return {};
      });

    product_categories.push(category);
  }

  return {
    product_categories,
  };
});

export const getProductsByCategoryHandle = cache(async function ({
  pageParam = 0,
  handle,
  countryCode,
}) {
  const { id } = await getCategoryByHandle([handle]).then(
    (res) => res.product_categories[0],
  );

  const { response, nextPage } = await getProductsList({
    pageParam,
    queryParams: { category_id: [id] },
    countryCode,
  })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });

  return {
    response,
    nextPage,
  };
});
