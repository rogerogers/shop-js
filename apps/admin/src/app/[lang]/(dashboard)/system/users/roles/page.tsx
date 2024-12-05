import PageHeader from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = '角色管理';
const desc = '角色管理';

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
            href: '/system/users/roles',
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>角色管理</CardTitle>
          <CardDescription>角色管理</CardDescription>
        </CardHeader>
        <CardContent>角色管理</CardContent>
      </Card>
    </>
  );
}
