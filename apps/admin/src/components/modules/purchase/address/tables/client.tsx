import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { Attribute } from '@/constants/data';
import { Separator } from '@rogerogers/ui/separator';
import { columns } from './columns';

interface PurchaseAddressTableProps {
  searchParams: { [key: string]: string | string[] | undefined };
  data: Attribute[];
  rowCount: number;
}

export const PurchaseAddressTable: React.FC<
  PurchaseAddressTableProps
> = async ({ searchParams, data, rowCount }) => {
  const { page, page_size } = searchParams;
  const pageIndex = page ? parseInt(page as string) : 1;
  const pageSize = page_size ? parseInt(page as string) : 20;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`收货地址 (${rowCount})`}
          description="展示 1688 收货地址"
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
