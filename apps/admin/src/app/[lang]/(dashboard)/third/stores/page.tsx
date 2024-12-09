import PageHeader from '@/components/layout/page-header';
import { ThirdStoresTable } from '@/components/modules/third/stores/tables/client';
import { listThirdStores } from '@/data/third-server';

const title = '店铺管理';
const desc = '店铺管理';
const Page = async function (props: ServerParams) {
  const searchParams = await props.searchParams;
  const data = await listThirdStores({
    page: searchParams?.page ?? 1,
    page_size: searchParams?.page_size ?? 20,
  });
  const result = data?.data?.stores;
  return (
    <>
      <PageHeader
        title={title}
        description={desc}
        breadcrumbs={[
          {
            title: '店铺管理',
            href: '/third/apps',
          },
        ]}
      />
      <ThirdStoresTable
        searchParams={searchParams}
        data={result}
        rowCount={data?.data?.pagination?.total}
      />
    </>
  );
};

export default Page;
