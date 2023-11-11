import React from "react";

const Label = ({ htmlFor = "", children }) => {
  return (
    <label className="text-lg font-bold" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
