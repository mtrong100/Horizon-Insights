import React from "react";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import { formateDate } from "../utils/helper";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";
import BlogType from "../components/BlogType";

const Blog = ({ data }) => {
  const { data: user } = useQuerySnapshot("User", "id", data?.userId);

  return (
    <article className="flex flex-col">
      <div className="w-full h-[200px] ">
        <img
          src={data?.thumbnail}
          alt="blog-image"
          className="img-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-2 bg-whiteSoft shadow-sm p-3 rounded-br-lg rounded-bl-lg">
        <div className="flex items-center justify-between">
          <span className="capitalize font-bold text-sm bg-blue-500 bg-opacity-20 text-indigo-500 w-fit px-5 py-2 rounded-full ">
            {data?.category}
          </span>
          <BlogType category={data?.type} />
        </div>
        <Link
          to={`/${data?.slug}`}
          className="font-bold text-slate-900 text-2xl line-clamp-2 leading-tight hover:underline cursor-pointer"
        >
          {data?.title}
        </Link>
        <p className="text-slate-700 text-sm line-clamp-3">
          {data?.description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mt-2">
          <img
            src={user?.avatar}
            alt="user-avatar"
            className="object-cover w-[50px] h-[50px] rounded-full flex-shrink-0"
          />
          <div>
            <h3 className="font-bold text-slate-700 ">{user?.username}</h3>
            <p className="text-sm font-medium">
              {formateDate(data?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Blog;

export const BlogSkeleton = () => {
  return (
    <article className="flex flex-col">
      <Skeleton className="h-[200px] rounded-lg" />

      <div className="flex flex-col gap-2 bg-whiteSoft shadow-sm p-3 rounded-br-lg rounded-bl-lg">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[30px] rounded-md" />
          <Skeleton className="h-[30px] rounded-md" />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-[20px] rounded-md" />
          <Skeleton className="h-[20px] rounded-md" />
          <Skeleton className="h-[20px] rounded-md w-[200px]" />
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 mt-2">
          <Skeleton className="w-[50px] h-[50px] rounded-full flex-shrink-0" />

          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-[20px] rounded-md w-[150px]" />
            <Skeleton className="h-[15px] rounded-md w-[60px]" />
          </div>
        </div>
      </div>
    </article>
  );
};
