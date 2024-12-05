'use client';
import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { AttributeValue } from '@/constants/data';
import { Separator } from '@rogerogers/ui/separator';
import { useRouter, useSearchParams } from 'next/navigation';
import { columns } from './columns';
import CreateDialog from './create-dialog';

interface AttrValueClientProps {
  data: AttributeValue[];
  rowCount: number;
}

export const AttrValueClient: React.FC<AttrValueClientProps> = ({
  data,
  rowCount,
}) => {
  const router = useRouter();
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
          title={`Attribute Value (${rowCount})`}
          description="Manage attribute value"
        />
        <CreateDialog />
      </div>
      <Separator />
      <DataTable
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
