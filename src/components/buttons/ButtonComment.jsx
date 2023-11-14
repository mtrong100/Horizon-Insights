import React from "react";
import { BiComment } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSidebarOpen, storeBlogId } from "../../redux/slices/globalSlice";

const ButtonComment = ({ blogId }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!blogId) return;
    dispatch(setSidebarOpen());
    dispatch(storeBlogId(blogId));
  };

  return (
    <div className="flex items-center flex-col gap-2">
      <span className="text-lg font-medium">25</span>
      <span
        onClick={handleClick}
        className="flex items-center hover:bg-gray-200 justify-center border-slate-500 cursor-pointer w-[50px] h-[50px] bg-gray-100 border shadow-sm rounded-full"
      >
        <BiComment size={25} />
      </span>
    </div>
  );
};

export default ButtonComment;
