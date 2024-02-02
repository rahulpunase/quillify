"use client";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Section2 = () => {
  return (
    <section className="w-[1024px] mb-10 mt-20 p-8 rounded border border-zinc-800 bg-zinc-50">
      <Carousel
        orientation="horizontal"
        plugins={[
          Autoplay({
            delay: 60000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="flex flex-row">
              <Image
                className="h-[600px] w-[400px]"
                src="businessman.svg"
                alt="business"
                height="600"
                width="400"
              />
              <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-4xl">Grow your Business</h1>
                <div className="mt-6">
                  Unlock the full potential of your business with Quillify – a
                  dynamic and versatile platform that seamlessly integrates
                  collaboration, project management, and information
                  organization. From streamlining communication to centralizing
                  data, Quillify empowers your team to grow together, fostering
                  innovation and efficiency. Take charge of your business's
                  evolution by harnessing the comprehensive tools and
                  customizable workspace that Quillify provides.
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="h-full">
            <div className="flex flex-row">
              <div className="h-full w-[400px]">
                <Image
                  className="h-[500px] w-[400px]"
                  src="love-women.svg"
                  alt="business"
                  height="600"
                  width="400"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-4xl">Grow your Business</h1>
                <div className="mt-6">
                  Unlock the full potential of your business with Quillify – a
                  dynamic and versatile platform that seamlessly integrates
                  collaboration, project management, and information
                  organization. From streamlining communication to centralizing
                  data, Quillify empowers your team to grow together, fostering
                  innovation and efficiency. Take charge of your business's
                  evolution by harnessing the comprehensive tools and
                  customizable workspace that Quillify provides.
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Section2;
