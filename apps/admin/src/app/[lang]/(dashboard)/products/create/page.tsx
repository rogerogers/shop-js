import { categoryWithAttribute, getCategory } from '@/data/server';
import ClientWarp from './warp';

export default async function ProductCreate({
  params,
  searchParams,
}: ServerParams) {
  const data = await getCategory(searchParams.category_id as string);
  const categoryAttributes = await categoryWithAttribute(searchParams);
  return (
    <ClientWarp
      category_detail={data?.data?.data}
      category_id={searchParams.category_id as string}
      categoryAttributes={categoryAttributes.data}
    />
  );
}
