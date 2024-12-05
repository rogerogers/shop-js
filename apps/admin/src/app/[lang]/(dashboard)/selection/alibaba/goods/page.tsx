import PageHeader from '@/components/layout/page-header';
import { SelectionTable } from '@/components/modules/selection/alibaba/tables/client';
import { listSelectionData } from '@/data/selection-server';

const title = '选品1688货品';
const desc = '选品1688货品';
const Page = async function ({ params, searchParams }: ServerParams) {
  const data = await listSelectionData({
    page: searchParams?.page ?? 1,
    page_size: searchParams?.page_size ?? 20,
    pallet: searchParams?.pallet,
  });
  const result = data?.result?.result;
  return (
    <>
      <PageHeader
        title={title}
        description={desc}
        breadcrumbs={[
          {
            title: '选品',
            href: '/selection',
          },
          {
            title: '阿里巴巴',
            href: '/selection/1688',
          },
          {
            title: '货品',
            href: '/selection/1688/goods',
          },
        ]}
      />
      <SelectionTable
        params={params}
        searchParams={searchParams}
        data={result?.data}
        rowCount={result?.totalRecords}
      />
    </>
  );
};

export default Page;
