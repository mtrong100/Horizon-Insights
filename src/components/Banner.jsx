import React from "react";

const Banner = () => {
  return (
    <div className="banner-background w-full h-[200px] md:h-[300px] rounded-3xl flex items-center flex-col gap-3 md:gap-5 justify-center text-white my-5 md:my-0">
      <h1 className="text-4xl md:text-6xl font-bold ">Horizon Insights</h1>
      <p className="font-medium md:text-lg ">
        Create something new. Explore further
      </p>
    </div>
  );
};

export default Banner;
