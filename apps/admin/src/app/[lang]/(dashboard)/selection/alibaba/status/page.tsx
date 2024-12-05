import PageHeader from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = '状态监控';
const desc = '监控1688商品上下架';

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
            href: '/selection/alibaba/status',
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent className="flex">
          <Card className="basis-1/4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日下架</CardTitle>
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
