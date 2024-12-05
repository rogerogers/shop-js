import PageHeader from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = 'Shopify';
const desc = 'Shopify';

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
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>Shopify</CardTitle>
          <CardDescription>Shopify</CardDescription>
        </CardHeader>
        <CardContent>Shopify</CardContent>
      </Card>
    </>
  );
}
