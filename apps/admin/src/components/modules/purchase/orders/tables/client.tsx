import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { Attribute } from '@/constants/data';
import { Separator } from '@rogerogers/ui/separator';
import { columns } from './columns';

interface PurchaseOrderTableProps {
  searchParams: { [key: string]: string | string[] | undefined };
  data: Attribute[];
  rowCount: number;
}

export const PurchaseOrderTable: React.FC<PurchaseOrderTableProps> = async ({
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
          title={`采购订单 (${rowCount})`}
          description="展示 1688 采购订单"
        />
      </div>
      <Separator />
      <DataTable
        searchKey="address"
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
