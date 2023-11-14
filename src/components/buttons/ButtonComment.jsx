import React from "react";
import { BiComment } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSidebarOpen, storeBlogId } from "../../redux/slices/globalSlice";

const ButtonComment = ({ blogId }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!blogId) return;
    dispatch(setSidebarOpen(true));
    dispatch(storeBlogId(blogId));
  };

  return (
    <span
      onClick={handleClick}
      className="flex items-center hover:bg-gray-200 justify-center border-slate-500 cursor-pointer w-[50px] h-[50px] bg-gray-100 border shadow-sm rounded-full"
    >
      <BiComment size={25} />
    </span>
  );
};

export default ButtonComment;
