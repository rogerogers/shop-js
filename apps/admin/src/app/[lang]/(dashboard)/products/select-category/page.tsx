import { TypographyH1 } from '@/components/custom/typography';
import { SelectCategoryCard } from '@/components/modules/products/select-category/card';
import { listCategory } from '@/data/server';
import { transformToTree } from '@/lib/utils';

export default async function SelectCategory({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categories = await listCategory(searchParams);
  const data = transformToTree(categories.data?.categories, 'category_id', '');

  return (
    <div>
      <TypographyH1 className="py-10">选择分类</TypographyH1>
      <SelectCategoryCard data={data} />
    </div>
  );
}
