import { Heading } from '@/components/custom/heading';
import { LanguageTabs } from '@/components/modules/selection/alibaba/detail/tabs';
import { listSelectionData } from '@/data/selection-server';

interface detailParams extends ServerParams {
  params: {
    offerId: string;
    attribute_id: string;
    slug: string;
  };
}

const Page = async function ({ params, searchParams }: detailParams) {
  const data = await listSelectionData({
    page: searchParams?.page ?? 1,
    page_size: searchParams?.page_size ?? 20,
    pallet: searchParams?.pallet,
  });
  const result = data?.result?.result;
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`商品详情`} description="展示 1688 商品详情" />
      </div>
      <LanguageTabs offerId={params?.offerId} />
    </>
  );
};

export default Page;
