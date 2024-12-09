import { PurchaseOrderTable } from '@/components/modules/purchase/orders/tables/client';
import { purchaseReveiveAddress } from '@/data/purchase-server';
const Page = async function (props: ServerParams) {
  const searchParams = await props.searchParams;
  const data = await purchaseReveiveAddress();
  const result = data?.result;
  return (
    <PurchaseOrderTable
      searchParams={searchParams}
      data={result?.receiveAddressItems}
      rowCount={result?.receiveAddressItems?.length}
    />
  );
};

export default Page;
