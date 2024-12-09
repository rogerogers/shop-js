import { listAttribute } from '@/data/server';
import ClientWarp from './warp';

export default async function Attribute(props: ServerParams) {
  const searchParams = await props.searchParams;
  const resdata = await listAttribute(searchParams);
  const { attributes, pagination } = resdata?.data;
  return <ClientWarp data={attributes} rowCount={pagination.total} />;
}
