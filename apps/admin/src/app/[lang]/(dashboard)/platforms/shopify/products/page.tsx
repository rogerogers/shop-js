import PageHeader from '@/components/layout/page-header';
import { listPlatformShopifyProduct } from '@/data/shopify-server';
import { PlatformShopifyProductListTable } from '@rogerogers/platform-shopify/products/list';
const Page = async function (props: ServerParams) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { store_id } = searchParams;
  const data = await listPlatformShopifyProduct({
    page: searchParams?.page ?? 1,
    page_size: searchParams?.page_size ?? 20,
    store_id: store_id,
    title: searchParams?.title,
  });
  console.log(data);
  const result = data?.data;
  return (
    <>
      <PageHeader
        title="platform"
        description="platform"
        breadcrumbs={[
          {
            title: 'Platform',
            href: '/platforms',
          },
          {
            title: 'Shopify',
            href: '/platforms/shopify',
          },
          {
            title: 'Product',
            href: '/platforms/shopify/products',
          },
        ]}
      />
      <PlatformShopifyProductListTable
        params={params}
        searchParams={searchParams}
        data={result?.products}
        rowCount={result?.total}
      />
    </>
  );
};

export default Page;
