import PageHeader from '@/components/layout/page-header';
import { ThirdAppsTable } from '@/components/modules/third/apps/tables';
import { listThirdApplications } from '@/data/third-server';

const title = '应用管理';
const desc = '应用管理';
const Page = async function ({ params, searchParams }: ServerParams) {
  const resData = await listThirdApplications({
    page: searchParams?.page ?? 1,
    page_size: searchParams?.page_size ?? 20,
  });
  const { applications, pagination } = resData?.data;
  return (
    <>
      <PageHeader
        title={title}
        description={desc}
        breadcrumbs={[
          {
            title: title,
            href: '/third/apps',
          },
        ]}
      />
      <ThirdAppsTable
        params={params}
        searchParams={searchParams}
        data={applications}
        rowCount={pagination?.total}
      />
    </>
  );
};

export default Page;
