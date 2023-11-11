import React from "react";
import { twMerge } from "tailwind-merge";

const FieldInput = ({
  name,
  id,
  register,
  error,
  placeholder = "Enter value...",
  className = "",
}) => {
  return (
    <div className="w-full">
      <input
        type="text"
        {...register(name)}
        id={name}
        name={name}
        className={twMerge(
          "p-3 outline-none rounded-md border w-full bg-transparent border-gray-500 focus:border-blue-400",
          className
        )}
        placeholder={placeholder}
      />

      {error && (
        <p className="mt-1 text-rose-500 font-medium text-sm">{error}</p>
      )}
    </div>
  );
};

export default FieldInput;
