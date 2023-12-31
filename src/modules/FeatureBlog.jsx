import React from "react";
import BlogType from "./BlogType";
import { Link } from "react-router-dom";
import { formateDate } from "../utils/helper";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import Skeleton from "../components/Skeleton";
import ButtonFollow from "../components/buttons/ButtonFollow";

const FeatureBlog = ({ data, currentUser }) => {
  const { data: user } = useQuerySnapshot("User", "id", data?.userId);

  return (
    <article className="flex items-start flex-col md:flex-row md:justify-between gap-2 md:h-[400px] ">
      <div className="w-full flex-1 h-[400px]">
        <img
          src={data?.thumbnail}
          alt="blog-image"
          className="img-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col flex-1 bg-secondaryColor py-3 px-5 gap-2 h-[400px] rounded-md">
        <div className="flex items-center justify-between">
          <span className="capitalize font-bold text-sm bg-forcegroundColor bg-opacity-20 text-textColor w-fit px-5 py-2 rounded-full ">
            {data?.category}
          </span>
          <BlogType category={data?.type} />
        </div>
        <Link
          to={`/${data?.slug}`}
          className="font-bold text-2xl lg:text-4xl leading-tight  hover:underline cursor-pointer line-clamp-2"
        >
          {data?.title}
        </Link>
        <p className="line-clamp-3 md:line-clamp-5 lg:line-clamp-none">
          {data?.description}
        </p>

        {/* Author */}
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-3 mt-2">
            <img
              src={user?.avatar}
              alt="user-avatar"
              className="object-cover w-[50px] h-[50px] rounded-full flex-shrink-0"
            />
            <div>
              <h3 className="font-bold ">{user?.username}</h3>
              <p className="text-sm font-medium">
                {formateDate(data?.createdAt)}
              </p>
            </div>
          </div>

          {currentUser?.id !== user?.id && <ButtonFollow userId={user?.id} />}
        </section>
      </div>
    </article>
  );
};

export default FeatureBlog;

export const FeatureBlogSkeleton = () => {
  return (
    <article className="flex items-start justify-between gap-2 h-[400px] ">
      <Skeleton className="w-full flex-1 h-[400px] rounded-xl" />

      <div className="flex flex-col flex-1 bg-secondaryColor py-3 px-5 gap-2 h-[400px] rounded-md">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-[50px] rounded-md" />
          <Skeleton className="w-[400px] h-[50px] rounded-md" />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Skeleton className="w-full h-[25px] rounded-md" />
          <Skeleton className="w-full h-[25px] rounded-md" />
          <Skeleton className="w-full h-[25px] rounded-md" />
          <Skeleton className="w-[400px] h-[25px] rounded-md" />
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
