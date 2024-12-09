import { SelectionTable } from '@/components/modules/selection/management/tables/client';
import { listSelectionData } from '@/data/selection-server';
const Page = async function (props: ServerParams) {
  const searchParams = await props.searchParams;
  const data = await listSelectionData({
    page: searchParams?.page ?? 1,
    page_size: searchParams?.page_size ?? 20,
    pallet: searchParams?.pallet,
  });
  const result = data?.result?.result;
  return (
    <SelectionTable
      searchParams={searchParams}
      data={result?.data}
      rowCount={result?.totalRecords}
    />
  );
};

export default Page;
