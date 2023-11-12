import React from "react";
import { menuLinks } from "../utils/constant";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MenuDropdown from "./MenuDropdown";

const Header = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <header className="p-4">
      <div className="page-container flex items-center justify-between">
        <Link to={"/"} className="text-2xl font-bold text-blue-500">
          Horizon Insights
        </Link>

        <ul className="flex items-center gap-5">
          {menuLinks.map((item) => {
            const isActive = location.pathname === item.link;

            return (
              <Link
                className={`${
                  isActive
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-500 text-slate-700 font-medium"
                } text-xl`}
                key={item.name}
                to={item.link}
              >
                {item.name}
              </Link>
            );
          })}
        </ul>

        <MenuDropdown currentUser={currentUser} />
      </div>
    </header>
  );
};

export default Header;
