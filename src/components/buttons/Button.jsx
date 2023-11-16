import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  type = "button",
  className = "",
  isLoading = false,
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={twMerge(
        `${
          isLoading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:opacity-90"
        } w-full bg-buttonColor p-3 rounded-md text-buttonText font-medium `,
        className
      )}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
