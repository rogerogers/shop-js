import { AttrClient } from '@/components/modules/sales-channels/tables/client';
import { listSalesChannel } from '@/data/server';

export default async function Attribute(
  props: {
    params: Promise<ServerParams>;
    searchParams: Promise<any>;
  }
) {
  const searchParams = await props.searchParams;
  const resData = await listSalesChannel(searchParams);
  const { sales_channels, pagination } = resData?.data;
  return <AttrClient data={sales_channels} rowCount={pagination.total} />;
}
