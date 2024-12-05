'use client';
import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { SalesChannel } from '@/constants/data';
import { Separator } from '@rogerogers/ui/separator';
import { useSearchParams } from 'next/navigation';
import { columns } from './columns';
import CreateDialog from './create-dialog';

interface AttrClientProps {
  data: SalesChannel[];
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
        <Heading title={`渠道 (${rowCount})`} description="渠道管理" />
        <CreateDialog />
      </div>
      <Separator />
      <DataTable
        clientTable={true}
        searchKey="name"
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
