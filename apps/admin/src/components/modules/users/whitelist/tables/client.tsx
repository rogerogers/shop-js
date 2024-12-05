import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { Separator } from '@rogerogers/ui/separator';
import { columns } from './columns';
import Modal from './modal';
import { type FormValue, defaultValues } from './schema';

interface SelectionTableProps extends ServerParams {
  data: FormValue[];
  rowCount: number;
}

export const UsersWhitelistTable: React.FC<SelectionTableProps> = async ({
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
          title={`邮箱白名单 (${rowCount})`}
          description="白名单中的用户允许登录"
        />
        <div className="flex h-full items-center">
          <Modal {...defaultValues} />
        </div>
      </div>
      <Separator />
      <DataTable
        searchKey="email"
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
