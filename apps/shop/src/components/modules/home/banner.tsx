'use client';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/custom/carousel';

export function Banner() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  const [hover, setHover] = React.useState(false);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={() => {
        plugin.current.stop();
        setHover(true);
      }}
      onMouseLeave={() => {
        plugin.current.play();
        setHover(false);
      }}
    >
      <CarouselContent>
        {Array.from([
          {
            img: 'https://img.ltwebstatic.com/images3_ccc/2024/04/01/56/171193812092bec676cd04cd8ee0fe685ad9cf5f4e.webp',
          },
          {
            img: 'https://img.ltwebstatic.com/images3_ccc/2024/03/25/2c/1711346744472212c10091d54937ca94cb14ff75f2_thumbnail_2000x.webp',
          },
          {
            img: 'https://img.ltwebstatic.com/images3_ccc/2024/03/25/7f/1711334787580c26c4ce333b10174a59c503224744_thumbnail_2000x.webp',
          },
          {
            img: 'https://img.ltwebstatic.com/images3_ccc/2024/02/26/a3/1708930226be8145a8e7cc3dad8c2ce8a7a446756e_thumbnail_2000x.webp',
          },
          {
            img: 'https://img.ltwebstatic.com/images3_ccc/2024/03/25/6f/1711347845bae06491c3b28104ab71c6ea67e910a2_thumbnail_2000x.webp',
          },
        ]).map((item, index) => (
          <CarouselItem key={index}>
            <div>
              <Image
                src={item.img}
                width={'0'}
                height={'0'}
                alt="hello activity"
                sizes="50vw"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {hover && (
        <>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </>
      )}
    </Carousel>
  );
}
