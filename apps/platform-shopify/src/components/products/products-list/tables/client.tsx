import { DataTable } from '@/components/custom/data-table';
import { listThirdStores } from '@rogerogers/next-common/data/third-server';
import type { ShopifyProduct } from '@rogerogers/platform-shopify';
import { Separator } from '@rogerogers/ui/separator';
import StoreSelect from '../select/store';
import { columns } from './columns';
import SearchBar from './search-bar';

interface SelectionTableProps extends ServerParams {
  data: ShopifyProduct[];
  rowCount: number;
}

export const PlatformShopifyProductListTable: React.FC<
  SelectionTableProps
> = async ({ searchParams, data, rowCount }) => {
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

  const stores = await listThirdStores({
    platform: 'shopify',
  });

  return (
    <>
      <StoreSelect stores={stores} />
      {/* <Search /> */}
      <SearchBar />
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
