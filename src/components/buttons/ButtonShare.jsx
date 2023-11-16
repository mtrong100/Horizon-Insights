import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { toast } from "sonner";
import { BASE_URL } from "../../utils/constant";

const ButtonShare = ({ slug }) => {
  const handleCopyLink = (slug) => {
    navigator.clipboard.writeText(`${BASE_URL}/${slug}`);
    toast.success("Copied!");
  };

  return (
    <button onClick={() => handleCopyLink(slug)} className="non-active-button">
      <BsLink45Deg size={25} />
    </button>
  );
};

export default ButtonShare;
