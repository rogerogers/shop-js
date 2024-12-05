import { getAttribute } from '@/data/server';
import ClientWarp from './warp';

export default async function Attribute({
  params,
  searchParams,
}: ServerParams) {
  const resData = await getAttribute(params.attribute_id, searchParams);
  const { attribute } = resData?.data;
  return <ClientWarp data={attribute} />;
}
