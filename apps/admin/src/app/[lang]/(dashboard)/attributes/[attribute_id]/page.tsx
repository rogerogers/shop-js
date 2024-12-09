import { getAttribute } from '@/data/server';
import ClientWarp from './warp';

export default async function Attribute(props: ServerParams) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const resData = await getAttribute(params.attribute_id, searchParams);
  const { attribute } = resData?.data;
  return <ClientWarp data={attribute} />;
}
