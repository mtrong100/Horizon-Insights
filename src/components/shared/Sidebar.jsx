import React from "react";
import { sidebarLinks } from "../../utils/constant";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sticky top-0 left-0 w-[280px] h-screen bg-secondaryColor p-4">
      <Link to={"/"} className="font-bold text-2xl text-center ">
        Horizon Insights
      </Link>
      <ul className="flex flex-col mt-5 gap-1">
        {sidebarLinks.map((item) => {
          const isActive = location.pathname === item.link;

          return (
            <Link
              to={item.link}
              key={item.name}
              className={`${
                isActive
                  ? "opacity-100 font-semibold bg-buttonColor text-buttonText"
                  : "non-active-link"
              } h-[50px] text-lg px-5 rounded-md cursor-pointer flex items-center gap-3`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
