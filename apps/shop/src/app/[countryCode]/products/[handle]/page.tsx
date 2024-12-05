// @ts-nocheck
import { getProductByHandle, getProductsList } from '@/lib/data';
import ProductTemplate from '@/modules/products/templates';

async function generateStaticParams() {
  // todo begin
  // const countryCodes = await listRegions().then((regions) =>
  //   regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
  // );
  const countryCodes = null;
  // todo end

  if (!countryCodes) {
    return null;
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode });
    }),
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat(),
  );

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      })),
    )
    .flat();

  return staticParams;
}

async function generateMetadata({ params }) {
  const { handle } = params;

  const { product } = await getProductByHandle(handle).then(
    (product) => product,
  );

  if (!product) {
    return;
    // notFound();
  }

  return {
    title: `${product.title} | Medusa Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

const getPricedProductByHandle = async (handle, region) => {
  return await getProductByHandle(handle)
    .then(({ product }) => {
      return product;
    })
    .catch((e) => {
      console.log(e);
    });

  // todo begin
  // if (!product || !product.id) {
  //   return null;
  // }

  // const pricedProduct = await retrievePricedProductById({
  //   id: product.id,
  //   regionId: region.id,
  // });

  // return pricedProduct;
  // todo end
};

export default async function ProductPage({ params }) {
  // todo begin
  // const region = await getRegion(params.countryCode);

  const region = null;
  // if (!region) {
  //   notFound();
  // }
  // todo end

  const pricedProduct = await getPricedProductByHandle(params.handle, region);

  if (!pricedProduct) {
    // notFound();
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  );
}
