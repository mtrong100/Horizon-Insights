import React from "react";
import { menuLinks } from "../../utils/constant";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MenuDropdown from "../MenuDropdown";
import ThemeButton from "../buttons/ThemeButton";

const Header = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <header className="p-2 md:p-4">
      <div className="page-container flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-5">
          <Link to={"/"} className="text-2xl font-bold text-textColor">
            Horizon Insights
          </Link>
          <ThemeButton />
        </div>

        <ul className="md:flex hidden items-center gap-5">
          {menuLinks.map((item) => {
            const isActive = location.pathname === item.link;

            return (
              <Link
                className={`${
                  isActive
                    ? "text-activeColor font-semibold"
                    : " font-medium text-textColor"
                }  lg:text-xl `}
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
