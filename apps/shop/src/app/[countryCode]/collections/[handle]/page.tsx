import { collection_detail } from '@/lib/data/collections';
import { Link } from '@rogerogers/i18n/routing';
import { NextImage } from '@rogerogers/next-common/custom/next-image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@rogerogers/ui/breadcrumb';
import { Card, CardContent, CardFooter } from '@rogerogers/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@rogerogers/ui/tooltip';
import { IconShoppingCart } from '@tabler/icons-react';

export default async function Page(props: ServerParams) {
  const params = await props.params;
  const res = await collection_detail(params.handle);
  return (
    <div>
      <Breadcrumb className="p-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <NextImage src="https://img.ltwebstatic.com/images3_ccc/2024/04/01/56/171193812092bec676cd04cd8ee0fe685ad9cf5f4e.webp" /> */}

      <div className="grid lg:grid-cols-4 grid-cols-2">
        {res?.result?.result.map((product: any, index: number) => {
          const height = (Math.random() + 100).toString() + 'px';
          return (
            <div className="p-1" key={index}>
              <Card className="border-none rounded-md hover:border-dotted">
                <CardContent className="flex aspect-square items-center justify-center p-0 md:p-6">
                  <Link href={'/products/abc'} className="flex w-full">
                    <div className="flex flex-col h-full">
                      <div>
                        <NextImage
                          src={product.imageUrl}
                          className={`w-full`}
                        />
                      </div>
                      <div>{product.subjectTrans}</div>
                    </div>
                  </Link>
                </CardContent>
                <CardFooter className="justify-between border-none pt-2">
                  <span>
                    {product.priceInfo.consignPrice} {' / '}
                    <span className="line-through">
                      {product.priceInfo.price}
                    </span>
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <IconShoppingCart className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to cart</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
