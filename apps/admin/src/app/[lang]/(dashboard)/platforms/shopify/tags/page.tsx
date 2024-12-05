import PageHeader from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

const title = 'Shopify Tags';
const desc = 'Shopify Tags';

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
            href: '/platforms/shopify/tags',
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>Shopify Tags</CardTitle>
          <CardDescription>Shopify Tags</CardDescription>
        </CardHeader>
        <CardContent>Shopify Tags</CardContent>
      </Card>
    </>
  );
}
