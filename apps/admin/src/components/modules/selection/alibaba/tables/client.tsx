import { DataTable } from '@/components/custom/data-table';
import { Attribute } from '@/constants/data';
import { Separator } from '@rogerogers/ui/separator';
import PalletSelect from '../select/pallet';
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
      <PalletSelect />
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
