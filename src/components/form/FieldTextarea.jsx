import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const FieldTextarea = ({
  name,
  id,
  register,
  error,
  placeholder = "Enter value...",
  className = "",
}) => {
  const [charCount, setCharCount] = useState(0);

  const handleInput = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 350) {
      setCharCount(inputValue.length);
    } else {
      event.target.value = inputValue.slice(0, 350);
    }
  };

  return (
    <div className="w-full">
      <textarea
        type="text"
        {...register(name)}
        id={name}
        name={name}
        className={twMerge(
          ` p-3 outline-none rounded-md border w-full resize-none min-h-[150px] bg-transparent  focus:border-blue-400`,
          className
        )}
        placeholder={placeholder}
        onInput={handleInput}
      />
      <p className="mt-1 text-right text-gray-500 text-sm">{charCount}/350</p>

      {error && (
        <p className="mt-1 text-rose-500 font-medium text-sm">{error}</p>
      )}
    </div>
  );
};

export default FieldTextarea;
