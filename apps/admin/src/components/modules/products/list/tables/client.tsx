'use client';
import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { Attribute } from '@/constants/data';
import { Button } from '@rogerogers/ui/button';
import { Separator } from '@rogerogers/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { columns } from './columns';

interface AttrClientProps extends ServerParams {
  data: Attribute[];
  rowCount: number;
}

export const AttrClient: React.FC<AttrClientProps> = ({ data, rowCount }) => {
  const searchParams = useSearchParams();

  const pageIndex =
    searchParams.get('page') !== null &&
    !isNaN(parseInt(searchParams.get('page') as string, 10))
      ? parseInt(searchParams.get('page') as string, 10) - 1
      : 0;

  const pageSize =
    searchParams.get('page_size') !== null &&
    !isNaN(parseInt(searchParams.get('page_size') as string, 10))
      ? parseInt(searchParams.get('page_size') as string, 10)
      : 20;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Products (${rowCount})`}
          description="Manage products (Client side table functionalities.)"
        />
        <Link href="/products/select-category">
          <Button className="text-xs md:text-sm mt-6">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable
        searchKey="attribute_name"
        columns={columns}
        rowCount={rowCount}
        data={data}
        defaultPagination={{
          pageIndex: pageIndex,
          pageSize: pageSize,
        }}
      />
    </>
  );
};
