import React from "react";
import { Link } from "react-router-dom";

const Tab = ({ children, link, onClick = () => {} }) => {
  if (link) {
    return (
      <Link
        to={link}
        className="font-semibold capitalize border-borderColor border hover:bg-hoverForeground transition-all cursor-pointer rounded-full text-textColor px-5 py-2"
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="font-semibold capitalize border-borderColor border hover:bg-hoverForeground transition-all cursor-pointer rounded-full text-textColor px-5 py-2"
    >
      {children}
    </button>
  );
};

export default Tab;
