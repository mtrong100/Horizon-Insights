import React from "react";
import BlogType from "./BlogType";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import { formateDate } from "../utils/helper";

const BlogItem = ({ data }) => {
  const { data: user } = useQuerySnapshot("User", "id", data?.userId);

  return (
    <article className="flex items-center justify-between">
      <div className="flex items-start gap-3">
        <img
          src={data?.thumbnail}
          alt="blog-thumbnail"
          className="rounded-lg w-[150px] h-[150px]"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="capitalize font-bold text-sm bg-blue-500 bg-opacity-20 text-indigo-500 w-fit px-5 py-2 rounded-full ">
              {data?.category}
            </span>
            <BlogType category={data?.type} />
          </div>
          <h1 className="text-xl font-semibold text-gray-600">{data?.title}</h1>
          <span className="font-semibold opacity-50">By: {user?.username}</span>
          <span className="font-medium">{formateDate(data?.createdAt)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button className="border border-green-500 text-green-500 py-2 w-[100px] font-medium hover:bg-green-100 rounded-full">
          Edit
        </button>
        <button className="border border-red-500 text-red-500 py-2 w-[100px] font-medium hover:bg-red-100 rounded-full">
          Delete
        </button>
      </div>
    </article>
  );
};

export default BlogItem;
