import PageHeader from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = '货品数据';
const desc = '货品管理';

export default async function Page() {
  return (
    <>
      <PageHeader
        title={title}
        description={desc}
        breadcrumbs={[
          {
            title: '货品管理',
            href: '/supply-chain/goods',
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>货品</CardTitle>
          <CardDescription>货品</CardDescription>
        </CardHeader>
        <CardContent>货品</CardContent>
      </Card>
    </>
  );
}
