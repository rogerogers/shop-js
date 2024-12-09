import { DataTable } from '@/components/custom/data-table';
import { Heading } from '@/components/custom/heading';
import { Separator } from '@rogerogers/ui/separator';
import { columns } from './columns';
import Modal from './modal';
import { type FormValue, defaultValues } from './schema';

interface SelectionTableProps {
  searchParams: { [key: string]: string | string[] | undefined };
  data: FormValue[];
  rowCount: number;
}

export const UsersWhitelistTable: React.FC<SelectionTableProps> = async ({
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
