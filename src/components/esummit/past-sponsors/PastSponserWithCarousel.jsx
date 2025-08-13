import React from "react";
import PastSponser from "./PastSponser";
import Carousel from "./Carousel";

const PastSponserWithCarousel = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-start items-stretch bg-black gap-12 p-2 w-full transform -translate-x-4 min-h-[30vh] py-12 sm:min-h-[30vh]">
      <div className="lg:w-1/2 flex items-center justify-center z-20">
        <PastSponser />
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <Carousel />
      </div>
    </div>
  );
};

export default PastSponserWithCarousel;
