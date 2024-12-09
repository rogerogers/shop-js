import PageHeader from '@/components/layout/page-header';
import { ThirdOrderTable } from '@/components/modules/third/orders/tables/client';
import { listThirdShopifyStores } from '@/data/third-server';
const title = '订单管理';
const desc = '订单管理';
const Page = async function (props: ServerParams) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await listThirdShopifyStores({
    page: searchParams?.page ?? 1,
    page_size: searchParams?.page_size ?? 20,
    store_id: 1,
  });
  const { orders, pagination } = data?.data;
  return (
    <>
      <PageHeader
        title={title}
        description={desc}
        breadcrumbs={[
          {
            title: title,
            href: '/third/orders',
          },
        ]}
      />
      <ThirdOrderTable
        searchParams={searchParams}
        data={orders}
        rowCount={pagination?.total}
      />
    </>
  );
};

export default Page;
