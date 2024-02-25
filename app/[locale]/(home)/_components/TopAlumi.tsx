"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import { alumniData } from "@/data/topalumni";
import { TopAlumniData } from "@/schemas";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

interface TopAlumniProps {
  alumniData: TopAlumniData;
}

const TopAlumi = ({ alumniData }: TopAlumniProps) => {
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className=" h-[488px] lg:h-[480px] grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {alumniData?.map((alumni) => (
            <CarouselItem key={alumni.key} className=" basis-1/2 ">
              <div className="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 md:h-[200px] ">
                <div className=" col-span-2  relative h-[200px] bg-transparent border border-black p-2 ">
                  <div className="w-full h-[182px] relative ">
                    <Image
                      src={alumni.image}
                      fill
                      alt="Image"
                      className=" object-cover object-center bg-no-repeat"
                    />
                  </div>
                </div>
                <div className=" col-span-3 md:col-span-2 lg:col-span-3  h-[200px] p-5 pt-5 sm:pt-0">
                  <div className="w-full h-full flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-xl font-bold text-left line-clamp-1">
                        {alumni?.name}
                      </h1>
                      <div className="flex flex-col">
                        <h1 className="text-lg font-bold text-left line-clamp-1">
                          {alumni?.company}
                        </h1>
                        <p className="text-base text-left line-clamp-1 italic">
                          {alumni?.position}
                        </p>
                      </div>
                    </div>

                    <p className=" text-base text-left line-clamp-3">
                      {alumni?.info}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default TopAlumi;
