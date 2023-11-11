import React from "react";
import { menuLinks } from "../utils/constant";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";

const Header = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <header className="p-3 ">
      <div className="page-container flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-500">Horizon Insights</h1>

        <ul className="flex items-center gap-5">
          {menuLinks.map((item) => {
            const isActive = location.pathname === item.link;

            return (
              <Link
                className={`${
                  isActive
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-500 text-slate-700 font-medium"
                } text-lg`}
                key={item.name}
                to={item.link}
              >
                {item.name}
              </Link>
            );
          })}
        </ul>

        <Dropdown currentUser={currentUser} />
      </div>
    </header>
  );
};

export default Header;
