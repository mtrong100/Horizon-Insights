import React from "react";

const BlogType = ({ category }) => {
  let style = "";
  let name = "";

  switch (category) {
    case "Hot":
      style = "bg-hotLinear ";
      name = "Hot";
      break;
    case "Feature":
      style = "bg-featureLinear ";
      name = "Feature";
      break;

    default:
      break;
  }

  return (
    <span
      className={`${style} capitalize font-bold text-sm text-white  bg-opacity-20  w-fit px-5 py-2 rounded-lg`}
    >
      {name}
    </span>
  );
};

export default BlogType;
