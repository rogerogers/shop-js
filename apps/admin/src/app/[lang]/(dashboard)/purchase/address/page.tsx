import { PurchaseAddressTable } from '@/components/modules/purchase/address/tables/client';
import { purchaseReveiveAddress } from '@/data/purchase-server';
const Page = async function ({ params, searchParams }: ServerParams) {
  const data = await purchaseReveiveAddress();
  const result = data?.result;
  return (
    <PurchaseAddressTable
      params={params}
      searchParams={searchParams}
      data={result?.receiveAddressItems}
      rowCount={result?.receiveAddressItems?.length}
    />
  );
};

export default Page;
