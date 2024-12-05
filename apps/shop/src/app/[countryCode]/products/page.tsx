import { ProductsFilter } from '@/modules/products/lists/components/filter/filter';
import { ProductsList } from '@/modules/products/lists/components/list/list';
export default async function Products() {
  return (
    <div className="flex flex-col">
      <div className="">{'Home > Home & Kitchen Irons & Steamers'}</div>
      <div className="flex">
        <div className="basis-1/5 sticky bottom-10">
          <ProductsFilter />
        </div>
        <div className="basis-4/5">
          <ProductsList />
        </div>
      </div>
    </div>
  );
}
