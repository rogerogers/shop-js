import PageHeader from '@/components/layout/page-header';
import { UsersWhitelistTable } from '@/components/modules/users/whitelist/tables/client';
import { authWhitelist } from '@/data/auth-server';

const title = '白名单管理';
const desc = '白名单管理';

export default async function Page({ params, searchParams }: ServerParams) {
  const data = await authWhitelist(searchParams);
  const { whitelist, pagination } = data?.data;
  return (
    <>
      <PageHeader
        title={title}
        description={desc}
        breadcrumbs={[
          {
            title: '系统',
            href: '/system',
          },
          {
            title: '员工',
            href: '/system/user',
          },
          {
            title: '角色',
            href: '/system/users/whitelist',
          },
        ]}
      />
      <UsersWhitelistTable
        params={params}
        data={whitelist}
        rowCount={pagination?.total}
        searchParams={searchParams}
      />
    </>
  );
}
