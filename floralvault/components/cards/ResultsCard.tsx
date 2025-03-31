import React from "react";

import Image from "next/image";
import { Plant } from "@/types/plants";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface ResultsCardProps {
  plant: Plant;
  compact?: boolean;
}

const ResultsCard = ({ plant, compact = false }: ResultsCardProps) => {
  return (
    <div
      className={`${
        compact
          ? "flex items-center gap-3 p-2 text-white bg-[#2b2a2a] rounded-md hover:bg-[#3a3a3a]"
          : "flex flex-col sm:flex-row w-full max-w-7xl md:max-h-[260px] gap-2 mb-5 bg-[#2b2a2a] rounded-2xl p-5"
      } cursor-pointer shadow-lg shadow-black/30 hover:shadow-xl transition-shadow duration-200 ease-in-out`}
    >
      {/* Plant Image */}
      <Image
        src={plant.imageUrl[0]}
        alt={plant.common_name}
        width={compact ? 50 : 200}
        height={compact ? 50 : 200}
        className={`rounded-xl object-cover flex-shrink-0 ${
          compact ? "h-[100px] w-[100px]" : "h-[200px] w-full sm:w-[200px]"
        }`}
      />
      {/* Plant Description */}
      <div className="flex flex-col pt-4 md:pt-0 sm:pl-5 overflow-hidden">
        <div className="flex flex-col gap-1">
          <h2 className={`${compact ? "text-sm" : "text-2xl"} text-[#81a308]`}>
            {plant.common_name}
          </h2>
          <h3 className={`${compact ? "text-xs" : "text-base"}`}>
            {plant.scientific_name}
          </h3>

          <div className="flex flex-wrap gap-1 pb-4 md:pb-4">
            {plant.tags.slice(0, 3).map((tag, i) => (
              <Link href={`/results?tag=${encodeURIComponent(tag)}`} key={i}>
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

        <div className={`${compact ? "hidden" : "mt-auto"}`}>
          <p className="text-sm line-clamp-3">{plant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
