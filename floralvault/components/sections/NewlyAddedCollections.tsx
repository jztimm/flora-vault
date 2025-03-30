import React from "react";
import PlantCarousel from "./PlantCarousel";

const NewlyAddedCollections = () => {
  return (
    <div>
      {/* <h1 className="text-3xl font-semibold px-10 py-5 cursor-pointer text-gray-800 dark:text-white">
        Newly Added Collections
      </h1> */}

      <div className="flex flex-wrap justify-center gap-4 px-10">
        {/* Example Plant Card */}
        {/* {plantData.map((plant, index) => (
          <div
            key={index}
            className="w-1/4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={plant.imageUrl}
              alt={plant.common_name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">
              {plant.scientific_name}
            </h2>
            <h3 className="text-md font-medium text-gray-800 dark:text-white">
              {plant.common_name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {plant.description.length > 50
                ? `${plant.description.substring(0, 50)}...`
                : plant.description}
            </p>
          </div>
        ))} */}
      </div>
      <PlantCarousel />
    </div>
  );
};

export default NewlyAddedCollections;
