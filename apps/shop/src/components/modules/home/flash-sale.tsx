import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/custom/carousel';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import NextImage from '../../NextImage';

export function FlashSale() {
  return (
    <Card className="border-none">
      <CardTitle className="p-10 text-red-300">Flash Sale</CardTitle>
      <CardContent>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-auto"
        >
          <CarouselContent>
            {Array.from([
              'https://img.ltwebstatic.com/images3_pi/2023/03/05/16780290301fddb874be546f8a481d9eeeed2f3e9e_thumbnail_405x552.jpg',
              'https://img.ltwebstatic.com/images3_pi/2022/07/29/1659085248a9db8aa24304de5040a45d6c3c910596_thumbnail_405x552.jpg',
              'https://img.ltwebstatic.com/images3_pi/2023/06/30/1688102681ec928600cdbffb6e06d30014ce668e40_thumbnail_405x552.jpg',
              'https://img.ltwebstatic.com/images3_pi/2021/11/19/163730622656f7c3df1fa6c5d88e752c257f0c0205_thumbnail_405x552.jpg',
              'https://img.ltwebstatic.com/images3_pi/2023/02/08/1675835012745b5cd524781a23066758aabab37eed_thumbnail_405x552.jpg',
              'https://img.ltwebstatic.com/images3_pi/2021/12/20/1639965693e4d32a1ea5f7ef80b510b8e7708cfe9c_thumbnail_405x552.jpg',
            ]).map((ln, index) => (
              <CarouselItem
                key={index}
                className="basis-2/5 md:basis-1/3 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0 md:p-6">
                      <Link href={'/products/abc'} className="flex w-full">
                        <NextImage src={ln} className="h-auto w-full" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
