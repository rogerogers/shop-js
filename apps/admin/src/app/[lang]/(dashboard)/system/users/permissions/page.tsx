import PageHeader from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = '权限管理';
const desc = '权限管理';

export default async function Page() {
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
            title: title,
            href: '/system/users/permissions',
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>权限管理</CardTitle>
          <CardDescription>权限管理</CardDescription>
        </CardHeader>
        <CardContent>权限管理</CardContent>
      </Card>
    </>
  );
}
