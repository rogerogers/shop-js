import PageHeader from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = '员工';
const desc = '员工管理';

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
            title: '用户',
            href: '/system/users/employees',
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>用户管理</CardTitle>
          <CardDescription>用户管理</CardDescription>
        </CardHeader>
        <CardContent>用户管理</CardContent>
      </Card>
    </>
  );
}
