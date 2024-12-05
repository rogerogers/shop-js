import { listAttribute } from '@/data/server';
import ClientWarp from './warp';

export default async function Attribute({
  params,
  searchParams,
}: ServerParams) {
  const resdata = await listAttribute(searchParams);
  const { attributes, pagination } = resdata?.data;
  return <ClientWarp data={attributes} rowCount={pagination.total} />;
}
