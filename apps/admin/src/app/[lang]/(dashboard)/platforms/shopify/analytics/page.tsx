import PageHeader from '@/components/layout/page-header';
import { Analytics } from '@rogerogers/platform-shopify/analytics/index';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = 'Shopify Collections';
const desc = 'Shopify Collections';

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
            href: '/platforms/shopify/collections',
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>Shopify Collections</CardTitle>
          <CardDescription>Shopify Collections</CardDescription>
        </CardHeader>
        <CardContent className="flex">
          <Analytics />
        </CardContent>
      </Card>
    </>
  );
}
