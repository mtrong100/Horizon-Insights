import React from "react";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import { format } from "timeago.js";
import Skeleton from "./Skeleton";
import { BiDotsHorizontal } from "react-icons/bi";

const Comment = ({ data }) => {
  const { data: user } = useQuerySnapshot("User", "id", data?.userId);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-start gap-1">
        <div className="w-[45px] h-[45px] flex-shrink-0">
          <img
            src={user?.avatar}
            alt="user-avatar"
            className=" rounded-full img-cover"
          />
        </div>

        <div className="py-2 px-4 bg-gray-200 rounded-2xl">
          <div className="flex items-center gap-1 text-lg">
            <h1 className="font-semibold ">{user?.username}</h1>
            <div className="font-bold">.</div>
            <p className="font-medium opacity-60 text-base">
              {format(data?.createdAt)}
            </p>
          </div>
          <p className="text-slate-900 text-lg">{data?.comment}</p>
        </div>
      </div>

      <span className="w-[35px] h-[35px] rounded-full flex items-center justify-center bg-gray-300 text-black text-opacity-70 cursor-pointer hover:bg-gray-400">
        <BiDotsHorizontal size={22} />
      </span>
    </div>
  );
};

export default Comment;

export const CommentSkeleton = () => {
  return (
    <div className="flex items-start gap-1">
      <Skeleton className="w-[45px] h-[45px] flex-shrink-0 rounded-full" />
      <Skeleton className="py-2 px-4  rounded-2xl h-[75px] w-[280px]" />
    </div>
  );
};
