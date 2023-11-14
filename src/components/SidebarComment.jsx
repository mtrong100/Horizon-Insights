import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadingTitle from "./HeadingTitle";
import Comment, { CommentSkeleton } from "./Comment";
import InputEmoji from "react-input-emoji";
import { toast } from "sonner";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import { IoClose } from "react-icons/io5";
import { setSidebarOpen } from "../redux/slices/globalSlice";

const SidebarComment = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const { sidebarOpen } = useSelector((state) => state.global);
  const { blogId, isLoading: pendingCmt } = useSelector(
    (state) => state.global
  );
  const [isLoading, setIsLoading] = useState(false);
  const { data: blog, setData } = useQuerySnapshot("Blog", "id", blogId);

  async function handleOnEnter(text) {
    if (!text.trim() || !blogId) return;

    setIsLoading(true);

    try {
      const blogDocRef = doc(db, "Blog", blogId);

      await updateDoc(blogDocRef, {
        comments: arrayUnion({
          id: uuidv4(),
          comment: text,
          userId: currentUser?.id,
          createdAt: Date.now(),
        }),
      });

      const updatedDoc = await getDoc(blogDocRef);
      setData({ ...updatedDoc.data() });
      setIsLoading(false);

      toast.info("Success!");
    } catch (error) {
      console.log(error);
      toast.error("Error add comment!");
    }
  }

  return (
    <section
      className={`${
        sidebarOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } w-[500px] bg-whiteSoft shadow-lg h-full fixed top-0 right-0 bottom-0 z-[999] transition-all duration-300`}
    >
      <div className="flex flex-col h-full px-5 ">
        <div className="flex items-center justify-between">
          <HeadingTitle className="text-slate-700 ">
            Comments ({blog?.comments.length || 0})
          </HeadingTitle>

          <span
            onClick={() => dispatch(setSidebarOpen())}
            className="w-[35px] h-[35px] rounded-full flex items-center justify-center bg-slate-700 text-white cursor-pointer hover:bg-opacity-80"
          >
            <IoClose size={22} />
          </span>
        </div>

        <main className="flex-1 mt-3 flex flex-col gap-4 overflow-y-auto px-3 pb-5  custom-scrollbar">
          {pendingCmt &&
            Array(5)
              .fill(0)
              .map((item, index) => <CommentSkeleton key={index} />)}

          {!pendingCmt &&
            blog &&
            blog?.comments?.length > 0 &&
            blog?.comments?.map((item) => (
              <Comment key={item.id} data={item} />
            ))}
        </main>

        <section className="w-full  bg-slate-50 p-3 gap-2 ">
          <div>
            {isLoading ? (
              <div className="flex items-center gap-2 text-xl justify-center opacity-60 font-semibold animate-bounce">
                <p>Submitting comment...</p>
                <div className="border-2 border-t-2 border-t-transparent w-[20px] h-[20px] rounded-full border-gray-500 animate-spin"></div>
              </div>
            ) : (
              <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                borderColor="#171725"
                shouldReturn
                inputClass={`p-4 rounded-md`}
                borderRadius={8}
                keepOpened
                theme="light"
                fontSize={18}
                onEnter={handleOnEnter}
                placeholder="Write comments..."
              />
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default SidebarComment;
