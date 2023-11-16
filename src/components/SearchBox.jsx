import React from "react";

const SearchBox = ({
  value,
  onChange = () => {},
  placeholder = "Search your blog...",
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3 outline-none rounded-md max-w-lg border w-full bg-transparent border-borderColor focus:border-buttonColor text-textColor"
    />
  );
};

export default SearchBox;
