import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { Attribute } from '@/constants/data';
import { Separator } from '@rogerogers/ui/separator';
import { columns } from './columns';

interface SelectionTableProps extends ServerParams {
  data: Attribute[];
  rowCount: number;
}

export const SelectionTable: React.FC<SelectionTableProps> = async ({
  params,
  searchParams,
  data,
  rowCount,
}) => {
  const pageIndex =
    searchParams['page'] !== null &&
    !isNaN(parseInt(searchParams['page'] as string, 10))
      ? parseInt(searchParams['page'] as string, 10) - 1
      : 0;

  const pageSize =
    searchParams['page_size'] !== null &&
    !isNaN(parseInt(searchParams['page_size'] as string, 10))
      ? parseInt(searchParams['page_size'] as string, 10)
      : 20;

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
