import React from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const FieldInputPassword = ({
  name,
  id,
  register,
  error,
  placeholder = "Enter value...",
  className = "",
}) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <div className="w-full ">
      <div className="relative">
        <input
          id={name}
          name={name}
          type={togglePassword ? "text" : "password"}
          {...register(name)}
          className={twMerge(
            "p-3 outline-none rounded-md border w-full bg-transparent border-gray-500 focus:border-blue-400",
            className
          )}
          placeholder={placeholder}
        />

        <span
          onClick={() => setTogglePassword(!togglePassword)}
          className="absolute cursor-pointer opacity-60 top-2/4 -translate-x-2/4 -translate-y-2/4 right-2"
        >
          <AiOutlineEyeInvisible size={20} />
        </span>
      </div>

      {error && (
        <p className="mt-1 text-rose-500 font-medium text-sm">{error}</p>
      )}
    </div>
  );
};

export default FieldInputPassword;
