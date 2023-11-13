import { AiOutlinePlus, AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineDashboardCustomize } from "react-icons/md";

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

export const blogCategories = [
  "Javascript",
  "React",
  "Tailwind CSS",
  "Firebase",
  "Redux",
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
