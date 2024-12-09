import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { Attribute } from '@/constants/data';
import { Separator } from '@rogerogers/ui/separator';
import { columns } from './columns';

interface SelectionTableProps {
  searchParams: { [key: string]: string | undefined | string[] };
  data: Attribute[];
  rowCount: number;
}

export const SelectionTable: React.FC<SelectionTableProps> = async ({
  searchParams,
  data,
  rowCount,
}) => {
  const { page, page_size } = searchParams;
  const pageIndex = page ? parseInt(page as string) : 1;
  const pageSize = page_size ? parseInt(page_size as string) : 20;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`应用数量 (${rowCount})`}
          description="展示各平台自研应用"
        />
      </div>
      <Separator />
      <DataTable
        searchKey="subject"
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
