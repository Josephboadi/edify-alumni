"use client";

import Wrapper from "@/components/common/Wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { herosData } from "@/data/heros";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

const Hero = () => {
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
  return (
    <div className="flex items-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {herosData.map((hero, index) => (
            <CarouselItem key={hero.key}>
              <div className="relative w-full h-[90vh]">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[var(--clr-black)] opacity-30 z-10"></div>
                <Image
                  src={hero.image}
                  fill
                  alt="hero"
                  className="object-cover lg:object-cover bg-no-repeat"
                />
                <div className="absolute  left-0 right-0 bottom-32  z-20">
                  <Wrapper>
                    <Card className="w-72 sm:w-72 md:w-96 border-none bg-[var(--clr-tertiary-trans)]">
                      <CardHeader>
                        <CardTitle className=" text-[var(--clr-primary)]">
                          {hero.title}
                        </CardTitle>
                        {/* <CardDescription>
                          Deploy your new project in one-click.
                        </CardDescription> */}
                      </CardHeader>
                      <CardContent className=" text-[var(--clr-primary)]">
                        {hero.description}
                      </CardContent>
                    </Card>
                  </Wrapper>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Hero;
