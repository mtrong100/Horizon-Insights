import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadingTitle from "./HeadingTitle";
import Comment, { CommentSkeleton } from "./Comment";
import InputEmoji from "react-input-emoji";
import { toast } from "sonner";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";
import { IoClose } from "react-icons/io5";
import {
  setIsUpdate,
  setSidebarOpen,
  storeBlogId,
  storeCmtData,
} from "../redux/slices/globalSlice";
import useQueryCollection from "../hooks/useQueryCollection";
import { v4 as uuidv4 } from "uuid";
import useQuerySnapshot from "../hooks/useQuerySnapshot";

const SidebarComment = ({ blogId }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { sidebarOpen, cmtData, isUpdate } = useSelector(
    (state) => state.global
  );

  const {
    data,
    setData,
    isLoading: pendingCmt,
  } = useQuerySnapshot("Blog", "id", blogId);

  // Fetch comment
  useEffect(() => {
    if (cmtData && isUpdate) {
      setText(cmtData.comment);
    }
  }, [cmtData, isUpdate]);

  // Add new comment
  async function handleAddComment(text) {
    if (!text.trim() || !blogId) return;

    setIsLoading(true);

    try {
      if (isUpdate && cmtData) {
        const blogDocRef = doc(db, "Blog", blogId);
        const docRef = await getDoc(blogDocRef);

        const comments = docRef.data()?.comments || [];
        const cmtIndex = comments.findIndex((item) => item.id === cmtData.id);

        const data = {
          ...cmtData,
          comment: text,
          updatedAt: Date.now(),
        };

        if (cmtIndex !== -1) {
          comments[cmtIndex] = data;
          await updateDoc(blogDocRef, {
            comments: comments,
          });
        }

        const updatedDoc = await getDoc(blogDocRef);
        setData({ ...updatedDoc.data() });

        dispatch(storeCmtData(null));
        dispatch(setIsUpdate(false));
        setIsLoading(false);
      } else {
        const blogDocRef = doc(db, "Blog", blogId);

        await updateDoc(blogDocRef, {
          comments: arrayUnion({
            id: uuidv4(),
            comment: text,
            userId: currentUser?.id,
            blogId: blogId,
            createdAt: Date.now(),
          }),
        });

        const updatedDoc = await getDoc(blogDocRef);
        setData({ ...updatedDoc.data() });

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error add comment!");
      setIsLoading(false);
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
            Comments ({data?.comments?.length || 0})
          </HeadingTitle>

          <span
            onClick={() => {
              dispatch(setSidebarOpen(false));
              dispatch(storeBlogId(""));
            }}
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
            data?.comments &&
            data?.comments?.length > 0 &&
            data?.comments?.map((item) => (
              <Comment key={item.id} data={item} setData={setData} />
            ))}
        </main>

        <section className="w-full  bg-slate-50 py-3 gap-2 ">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xl justify-center opacity-60 font-semibold animate-bounce">
              <p>
                {isUpdate ? "Updating comment..." : "Submitting comment..."}
              </p>
              <div className="border-2 border-t-2 border-t-transparent w-[20px] h-[20px] rounded-full border-gray-500 animate-spin"></div>
            </div>
          ) : (
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              borderColor="#171725"
              shouldReturn
              inputClass="p-4"
              borderRadius={8}
              keepOpened
              theme="light"
              fontSize={18}
              onEnter={handleAddComment}
              placeholder="Write comments..."
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default SidebarComment;
