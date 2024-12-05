import PageHeader from '@/components/layout/page-header';
import { toTitle } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rogerogers/ui/card';

import type { Metadata } from 'next';

const title = 'platform';
const desc = 'platform page';

export const metadata: Metadata = {
  title: title,
  description: desc,
};

export default async function Page() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          {
            title: toTitle(title),
            href: '/platforms',
          },
        ]}
        title={title}
        description={desc}
      />

      <Card>
        <CardHeader>
          <CardTitle>Platform</CardTitle>
          <CardDescription>Platform</CardDescription>
        </CardHeader>
        <CardContent>Platform</CardContent>
      </Card>
    </>
  );
}
