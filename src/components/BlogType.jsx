import React from "react";

const BlogType = ({ category }) => {
  let style = "";
  let name = "";

  switch (category) {
    case "Hot":
      style = "bg-rose-500 text-rose-500 border border-rose-600";
      name = "Hot";
      break;
    case "Feature":
      style = "bg-green-500 text-green-500 border border-green-600";
      name = "Feature";
      break;

    default:
      break;
  }

  return (
    <span
      className={`${style} capitalize font-bold text-sm  bg-opacity-20  w-fit px-5 py-2 rounded-tl-xl rounded-br-xl`}
    >
      {name}
    </span>
  );
};

export default BlogType;
