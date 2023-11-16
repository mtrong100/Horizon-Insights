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
    <div className="flex items-center  gap-2">
      {data?.likes?.some((item) => item === currentUser?.id) ? (
        <button
          disabled={isLoading}
          onClick={handleLikeBlog}
          className={`${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:opacity-90"
          } active-button`}
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
              : "cursor-pointer hover:bg-gray-300 dark:hover:opacity-80"
          } non-active-button`}
        >
          <BiLike size={25} />
        </button>
      )}
      <span className="text-xl font-medium">{data?.likes?.length || 0}</span>
    </div>
  );
};

export default ButtonLike;
