import PageHeader from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = '侵权词管理';
const desc = '侵权词管理';

export default async function Page() {
  return (
    <>
      <PageHeader
        title={title}
        description={desc}
        breadcrumbs={[
          {
            title: '平台',
            href: '/platforms',
          },
          {
            title: 'Shopify',
            href: '/platforms/shopify',
          },
          {
            title: title,
            href: '/platforms/shopify/infringement',
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>侵权词管理</CardTitle>
          <CardDescription>侵权词管理</CardDescription>
        </CardHeader>
        <CardContent>侵权词管理</CardContent>
      </Card>
    </>
  );
}
