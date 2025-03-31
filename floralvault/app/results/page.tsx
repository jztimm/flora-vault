import React from "react";
import { redirect } from "next/navigation";
import ResultsCard from "@/components/cards/ResultsCard";

import { plantData } from "@/mock/plantData";
import { Plant } from "@/types/plants";
import GoBackButton from "@/components/ui/GoBackButton";

interface Props {
  searchParams: {
    tag?: string;
    query?: string;
  };
}

const ResultsPage = ({ searchParams }: Props) => {
  const { tag, query } = searchParams;

  if (!tag && !query) {
    redirect("/");
  }

  // Filter plants based on tag or query
  const filteredResults = plantData.filter((plant) => {
    if (tag) {
      const lowerTag = tag.toLowerCase();
      return plant.tags.some((t) => t.toLowerCase() === lowerTag);
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      return (
        plant.common_name?.toLowerCase().includes(lowerQuery) ||
        plant.scientific_name.toLowerCase().includes(lowerQuery) ||
        plant.description.toLowerCase().includes(lowerQuery) ||
        plant.origin.toLowerCase().includes(lowerQuery) ||
        plant.tags.some((t) => t.toLowerCase().includes(lowerQuery))
      );
    }

    return false;
  });

  console.log(filteredResults);

  return (
    <div className="flex flex-col text-white py-5 px-10 text-2xl font-semibold">
      {/* Page Heading */}
      <div className="flex py-5 items-center justify-between">
        <h1>
          Searching for:{" "}
          <span className="italic">
            {tag?.toUpperCase() || query?.toUpperCase()}
          </span>
        </h1>

        <GoBackButton />
      </div>

      {/* Results cards */}

      {filteredResults.length === 0 ? (
        <p className="text-center text-base text-muted-foreground py-10">
          No matching plants found.
        </p>
      ) : (
        <div className="flex flex-col w-full justify-center items-center ">
          {filteredResults.map((plant: Plant) => (
            <ResultsCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
