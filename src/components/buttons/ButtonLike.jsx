import React, { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import useQuerySnapshot from "../../hooks/useQuerySnapshot";

const ButtonLike = ({ blogId }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData } = useQuerySnapshot("Blog", "id", blogId);

  const handleLikeBlog = async () => {
    if (!blogId || !currentUser?.id) return;

    setIsLoading(true);

    try {
      const likeDocRef = doc(db, "Blog", blogId);
      const likeDoc = await getDoc(likeDocRef);
      const isLike = (likeDoc.data()?.likes || []).includes(currentUser?.id);

      const updateLike = isLike
        ? { likes: arrayRemove(currentUser?.id) }
        : { likes: arrayUnion(currentUser?.id) };

      await updateDoc(likeDocRef, updateLike);
      const updatedDoc = await getDoc(likeDocRef);
      setData({ ...updatedDoc.data() });

      setIsLoading(false);
    } catch (error) {
      console.error("Error like blog:", error);
      toast.error("Failed!");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col gap-2">
      <span className="text-lg font-medium">{data?.likes?.length || 0}</span>

      {data?.likes?.some((item) => item === currentUser?.id) ? (
        <button
          disabled={isLoading}
          onClick={handleLikeBlog}
          className={`${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-blue-600"
          } flex items-center justify-center w-[50px] h-[50px] bg-blue-500 text-white  shadow-sm rounded-full`}
        >
          <BiSolidLike size={25} />
        </button>
      ) : (
        <button
          disabled={isLoading}
          onClick={handleLikeBlog}
          className={`${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-gray-200"
          } flex items-center justify-center w-[50px] h-[50px] bg-gray-100 border border-slate-500 shadow-sm rounded-full`}
        >
          <BiLike size={25} />
        </button>
      )}
    </div>
  );
};

export default ButtonLike;
