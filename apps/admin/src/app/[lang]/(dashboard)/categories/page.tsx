import { listCategory } from '@/data/server';
import { transformToTree } from '@/lib/utils';
import { DataTable } from './data-table';

export default async function Category({ params, searchParams }: ServerParams) {
  const resData = await listCategory(searchParams);
  const categories = resData?.data;
  const data = transformToTree(categories.categories, 'category_id', '');
  return (
    <div className="py-10">
      <DataTable columns={data} level={1} />
    </div>
  );
}
