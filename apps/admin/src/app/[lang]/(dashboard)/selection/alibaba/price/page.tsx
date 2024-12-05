import PageHeader from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = '价格监控';
const desc = '监控1688商品价格';

export default async function Page() {
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
            href: '/selection/alibaba',
          },
          {
            title: title,
            href: '/selection/alibaba/price',
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>价格监控</CardTitle>
          <CardDescription>1688商品价格监控</CardDescription>
        </CardHeader>
        <CardContent className="flex">
          <Card className="basis-1/4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日降价</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">5% from yesterday</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}
