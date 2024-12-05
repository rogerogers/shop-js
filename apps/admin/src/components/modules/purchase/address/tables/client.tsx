import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { Attribute } from '@/constants/data';
import { Separator } from '@rogerogers/ui/separator';
import { columns } from './columns';

interface PurchaseAddressTableProps extends ServerParams {
  data: Attribute[];
  rowCount: number;
}

export const PurchaseAddressTable: React.FC<
  PurchaseAddressTableProps
> = async ({ params, searchParams, data, rowCount }) => {
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
