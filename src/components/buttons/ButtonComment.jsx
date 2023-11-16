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
    <span onClick={handleClick} className="non-active-button">
      <BiComment size={25} />
    </span>
  );
};

export default ButtonComment;
