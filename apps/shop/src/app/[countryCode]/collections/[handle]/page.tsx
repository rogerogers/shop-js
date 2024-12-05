import { Link } from '@rogerogers/i18n/routing';
import { NextImage } from '@rogerogers/next-common/custom/next-image';
import { Card, CardContent, CardFooter } from '@rogerogers/ui/card';

export default async function Page({ params, searchParams }: ServerParams) {
  return (
    <div>
      <NextImage src="https://img.ltwebstatic.com/images3_ccc/2024/04/01/56/171193812092bec676cd04cd8ee0fe685ad9cf5f4e.webp" />

      <div className="grid lg:grid-cols-3 grid-cols-2">
        {Array.from([
          'https://img.ltwebstatic.com/images3_pi/2023/03/05/16780290301fddb874be546f8a481d9eeeed2f3e9e_thumbnail_405x552.jpg',
          'https://img.ltwebstatic.com/images3_pi/2022/07/29/1659085248a9db8aa24304de5040a45d6c3c910596_thumbnail_405x552.jpg',
          'https://img.ltwebstatic.com/images3_pi/2023/06/30/1688102681ec928600cdbffb6e06d30014ce668e40_thumbnail_405x552.jpg',
          'https://img.ltwebstatic.com/images3_pi/2021/11/19/163730622656f7c3df1fa6c5d88e752c257f0c0205_thumbnail_405x552.jpg',
          'https://img.ltwebstatic.com/images3_pi/2023/02/08/1675835012745b5cd524781a23066758aabab37eed_thumbnail_405x552.jpg',
          'https://img.ltwebstatic.com/images3_pi/2021/12/20/1639965693e4d32a1ea5f7ef80b510b8e7708cfe9c_thumbnail_405x552.jpg',
        ]).map((ln, index) => {
          const height = (Math.random() + 100).toString() + 'px';
          return (
            <div className="p-1" key={index}>
              <Card className="border-none rounded-md">
                <CardContent className="flex aspect-square items-center justify-center p-0 md:p-6">
                  <Link href={'/products/abc'} className="flex w-full">
                    <NextImage src={ln} className={`h-[${height}] w-full`} />
                  </Link>
                </CardContent>
                <CardFooter className="justify-center border-none pt-2">
                  Clothes
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
