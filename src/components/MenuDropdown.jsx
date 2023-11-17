import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import {
  MdOutlineContactSupport,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { Fragment } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "sonner";
import { Link } from "react-router-dom";

/* ====================================================== */

const MenuDropdown = ({ currentUser }) => {
  const dropdownLinks = [
    {
      label: "Dashboard",
      icon: <MdOutlineDashboardCustomize />,
      href: "/dashboard",
    },
    {
      label: "Settings",
      icon: <AiOutlineSetting />,
      onClick: () => toast.info("Nothing happened!"),
    },
    {
      label: "Support",
      icon: <MdOutlineContactSupport />,
      onClick: () => toast.info("Nothing happened!"),
    },
    { label: "Sign out", icon: <BiLogOut />, onClick: () => signOut(auth) },
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <div className="flex items-center gap-3 cursor-pointer">
          <h3 className="font-bold md:block hidden text-lg">
            {currentUser?.username}
          </h3>
          <img
            src={currentUser?.avatar}
            alt="user-avatar"
            className="object-cover w-[40px] h-[40px] rounded-full"
          />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute lg:block hidden min-w-[170px] right-0 z-10 top-[45px] xl:w-full origin-bottom  bg-secondaryColor rounded-md shadow-lg  ">
          {dropdownLinks.map((link) => (
            <Menu.Item key={link.label} as={Fragment}>
              {({ active }) => (
                <Link
                  to={link.href}
                  onClick={link.onClick}
                  className={`flex list-none items-center h-[45px] gap-2  hover:bg-hoverForeground px-5 rounded-md cursor-pointer`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className=" ">{link.label}</span>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropdown;
