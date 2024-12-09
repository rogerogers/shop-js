import { DataTable } from '@/components/custom/data-table';
import { listThirdStores } from '@rogerogers/next-common/data/third-server';
import type { ShopifyProduct } from '@rogerogers/platform-shopify';
import { Separator } from '@rogerogers/ui/separator';
import StoreSelect from '../select/store';
import { columns } from './columns';
import SearchBar from './search-bar';

interface SelectionTableProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
  data: ShopifyProduct[];
  rowCount: number;
}

export const PlatformShopifyProductListTable: React.FC<
  SelectionTableProps
> = async ({ searchParams, data, rowCount }) => {
  const { page, page_size } = searchParams;
  const pageIndex = page ? parseInt(page as string) : 1;
  const pageSize = page_size ? parseInt(page_size as string) : 20;

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
          pageIndex: pageIndex as number,
          pageSize: pageSize as number,
        }}
      />
    </>
  );
};
