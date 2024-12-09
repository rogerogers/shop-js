import { DataTable } from '@/components/custom/data-table';
import { Platform } from '@/constants/data';
import { Separator } from '@rogerogers/ui/separator';
import { columns } from './columns';

interface SelectionTableProps {
  searchParams: { [key: string]: string | string[] | undefined };
  data: Platform[];
  rowCount: number;
}

export const ThirdAppsTable: React.FC<SelectionTableProps> = async ({
  searchParams,
  data,
  rowCount,
}) => {
  const { page, page_size } = searchParams;
  const pageIndex = page ? parseInt(page as string) : 1;
  const pageSize = page_size ? parseInt(page_size as string) : 20;

  return (
    <>
      <Separator />
      <DataTable
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
