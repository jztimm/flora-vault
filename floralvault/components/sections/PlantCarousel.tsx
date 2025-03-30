"use client";

import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { plantData } from "@/mock/plantData";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function PlantCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselApiRef = useRef<any>(null);
  const apiRef = useRef<any>(null); // new internal ref
  const [isHovered, setIsHovered] = useState(false);

  const updateActiveIndex = () => {
    if (carouselApiRef.current) {
      const newIndex = carouselApiRef.current.selectedScrollSnap();
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (apiRef.current && !isHovered) {
        const nextIndex =
          (apiRef.current.selectedScrollSnap() + 1) % plantData.length;
        apiRef.current.scrollTo(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="w-full bg-[#121212] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href={"/newly-added"}>
          <h2 className="text-3xl font-bold mb-8 text-white">
            Newly Added Collections
          </h2>
        </Link>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
            onSelect={updateActiveIndex}
            setApi={(api) => {
              carouselApiRef.current = api;
              apiRef.current = api;
              api?.on("select", updateActiveIndex);
            }}
          >
            <CarouselContent>
              {plantData.map((plant) => (
                <CarouselItem
                  key={plant.id}
                  className="md:basis-1/3 lg:basis-1/5 px-4"
                >
                  <div className="relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03] cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

                    <img
                      src={plant.imageUrl}
                      alt={plant.common_name || plant.scientific_name}
                      className="w-full h-80 object-cover"
                    />

                    <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                      <h3 className="text-lg font-bold leading-tight line-clamp-2">
                        {plant.common_name || plant.scientific_name}
                      </h3>
                      <p className="text-sm font-medium opacity-90">
                        {plant.origin}
                      </p>
                      <p className="text-sm opacity-80 line-clamp-1">
                        {plant.family}
                      </p>

                      <div className="flex gap-1 mt-2">
                        {plant.tags.slice(0, 3).map((tag, i) => (
                          <Link
                            href={`/results?tag=${encodeURIComponent(tag)}`}
                            key={i}
                          >
                            <Badge
                              variant="secondary"
                              className="text-[12px] justify-center px-2 py-0.5 max-w-[80px] truncate hover:bg-[#5f9f6a] hover:rounded-2xl hover:text-white"
                            >
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center mt-6 gap-1">
          {plantData.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full mx-0.5 transition-all duration-300 ease-in-out ${
                activeIndex === index ? "bg-white scale-125" : "bg-gray-600"
              }`}
              onClick={() => carouselApiRef.current?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-[20] uppercase text-sm tracking-wide">
            See All Newest Listings
          </Button>
        </div>
      </div>
    </div>
  );
}
