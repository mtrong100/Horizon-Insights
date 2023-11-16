import React from "react";
import { twMerge } from "tailwind-merge";

const HeadingTitle = ({ className = "", children }) => {
  return (
    <h1
      className={twMerge(
        "text-4xl font-bold leading-normal capitalize",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default HeadingTitle;
