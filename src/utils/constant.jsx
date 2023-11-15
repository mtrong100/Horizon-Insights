import { AiOutlinePlus, AiOutlineHome } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineDashboardCustomize } from "react-icons/md";

export const profileImage =
  "https://images.unsplash.com/photo-1682687219640-b3f11f4b7234?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const menuLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Explore",
    link: "/explore",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export const footerDetails = [
  {
    id: 1,
    title: "Product",
    links: [
      "Landing Page",
      "Popup Builder",
      "Web-design",
      "Content",
      "Integrations",
    ],
  },
  {
    id: 2,
    title: "Use Cases",
    links: [
      "Web-designers",
      "Marketerser",
      "Small Business",
      "Website Builder",
    ],
  },
  {
    id: 3,
    title: "Company",
    links: ["About Us", "Careers", "Terms", "Contact Us", "Team"],
  },
  {
    id: 4,
    title: "Resources",
    links: ["About Us", "Careers", "Terms", "Contact Us", "Team"],
  },
];

export const sidebarLinks = [
  {
    name: "Home",
    icon: <AiOutlineHome />,
    link: "/",
  },
  {
    name: "Dashboard",
    icon: <MdOutlineDashboardCustomize />,
    link: "/dashboard",
  },
  {
    name: "Create",
    icon: <AiOutlinePlus />,
    link: "/create-blog",
  },
  {
    name: "Manage",
    icon: <BiSolidPencil />,
    link: "/manage-blog",
  },
];

export const filterOption = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Hot",
    value: "Hot",
  },
  {
    title: "Feature",
    value: "Feature",
  },
];

export const typeBlogs = ["Normal", "Feature", "Hot"];
export const tabs = ["Blog", "Favorite"];
export const BASE_URL = "https://blog-app-horizon.vercel.app";
