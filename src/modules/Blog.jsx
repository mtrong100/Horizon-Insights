import React, { useEffect } from "react";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import { formateDate } from "../utils/helper";
import Skeleton from "../components/Skeleton";
import { Link, useNavigate } from "react-router-dom";
import BlogType from "./BlogType";
import ButtonFollow from "../components/buttons/ButtonFollow";
import { useAuth } from "../context/AuthContext";
import { twMerge } from "tailwind-merge";

const Blog = ({ data, className = "" }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { data: user } = useQuerySnapshot("User", "id", data?.userId);

  const handleClick = () => {
    navigate(`/${data?.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <article className="flex flex-col">
      <div className="w-full h-[180px] xl:h-[200px] ">
        <img
          src={data?.thumbnail}
          alt="blog-image"
          className="img-cover rounded-lg"
        />
      </div>

      <div
        className={twMerge(
          "flex flex-col gap-2 bg-secondaryColor shadow-sm p-3 rounded-br-lg rounded-bl-lg",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <span className="capitalize font-bold text-sm bg-forcegroundColor bg-opacity-20 text-textColor w-fit px-5 py-2 rounded-full ">
            {data?.category}
          </span>
          <BlogType category={data?.type} />
        </div>
        <h1
          onClick={handleClick}
          className="font-bold text-xl xl:text-2xl line-clamp-2 leading-tight hover:underline cursor-pointer"
        >
          {data?.title}
        </h1>
        <p className=" text-sm line-clamp-2 xl:line-clamp-3">
          {data?.description}
        </p>

        {/* Author */}
        <div className="flex items-center  mt-2 justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar}
              alt="user-avatar"
              className="object-cover w-[50px] h-[50px] rounded-full flex-shrink-0"
            />
            <div>
              <h3 className="font-bold">{user?.username}</h3>
              <p className="text-sm font-medium">
                {formateDate(data?.createdAt)}
              </p>
            </div>
          </div>

          {currentUser?.id !== data?.userId && (
            <ButtonFollow userId={data?.userId} />
          )}
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

      <div className="flex flex-col gap-2 bg-secondaryColor shadow-sm p-3 rounded-br-lg rounded-bl-lg">
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
