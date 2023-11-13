import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  type = "button",
  className = "",
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={twMerge(
        `${
          isLoading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-indigo-700 "
        } w-full bg-indigo-600 p-3 rounded-md text-white font-medium `,
        className
      )}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
