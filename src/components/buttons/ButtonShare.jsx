import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { toast } from "sonner";

const ButtonShare = () => {
  const handleCopyLink = () => {
    toast.success("Copied!");
  };

  return (
    <button
      onClick={handleCopyLink}
      className="flex items-center justify-center hover:bg-gray-200 cursor-pointer w-[50px] h-[50px] bg-gray-100 border shadow-sm rounded-full"
    >
      <BsLink45Deg size={25} />
    </button>
  );
};

export default ButtonShare;
