import { listAttribute } from '@/data/server';
import ClientWarp from './warp';

export default async function Attribute({
  params,
  searchParams,
}: ServerParams) {
  const res = await listAttribute(searchParams);
  const { attributes, pagination } = res?.data;
  return <ClientWarp data={attributes} rowCount={pagination.total} />;
}
