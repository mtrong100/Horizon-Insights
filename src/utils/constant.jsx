import { AiOutlinePlus, AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";

export const menuLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blog",
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
    name: "Profile",
    icon: <AiOutlineUser />,
    link: "/profile",
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
