import React, { useState } from "react";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import { format } from "timeago.js";
import Skeleton from "./Skeleton";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { setIsUpdate, storeCmtData } from "../redux/slices/globalSlice";

const Comment = ({ data, setData = () => {} }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: user } = useQuerySnapshot("User", "id", data?.userId);

  const handleDeleteComment = async (value) => {
    if (!value) return;
    setIsDeleting(true);

    try {
      const blogDocRef = doc(db, "Blog", data?.blogId);
      const docRef = await getDoc(blogDocRef);

      const updatedCmt = (docRef.data()?.comments || []).filter(
        (item) => item.id !== value.id
      );

      await updateDoc(blogDocRef, {
        comments: updatedCmt,
      });
      const updatedDoc = await getDoc(blogDocRef);
      setData({ ...updatedDoc.data() });

      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed! Can not delete comment!");
      setIsDeleting(false);
    }
  };

  const handleClick = (value) => {
    if (!value) return;
    dispatch(storeCmtData(value));
    dispatch(setIsUpdate(true));
  };

  return (
    <section
      className={`${isDeleting ? "opacity-50" : ""} flex items-center gap-3`}
    >
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
            {data?.updatedAt ? (
              <p className="font-medium opacity-60 text-base">
                Edited {format(data?.updatedAt)}
              </p>
            ) : (
              <p className="font-medium opacity-60 text-base">
                {format(data?.createdAt)}
              </p>
            )}
          </div>
          <p className="text-slate-900 font-normal text-lg">{data?.comment}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => handleClick(data)}
          className="w-[35px] h-[35px] rounded-full flex items-center justify-center bg-gray-300 text-black text-opacity-70 cursor-pointer hover:bg-gray-400"
        >
          <MdEdit size={20} />
        </button>

        <button
          disabled={isDeleting}
          onClick={() => handleDeleteComment(data)}
          className={`${
            isDeleting
              ? "cursor-not-allowed"
              : "cursor-pointer hover:bg-gray-400"
          } w-[35px] h-[35px] rounded-full flex items-center justify-center bg-gray-300 text-black text-opacity-70  `}
        >
          <MdDelete size={20} />
        </button>
      </div>
    </section>
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
