import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { footerDetails } from "../utils/constant";

const socialIcons = [
  <AiFillFacebook />,
  <AiFillInstagram />,
  <AiFillTwitterCircle />,
];

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="py-10 page-container">
        <div className="flex flex-col items-center justify-between md:flex-row ">
          <Link
            to="/"
            className="text-linear text-3xl font-bold leading-normal"
          >
            Money Blogging
          </Link>

          <div className="flex items-center gap-5">
            {socialIcons.map((item, index) => (
              <span
                key={index}
                className="text-3xl cursor-pointer hover:text-blue-500 text-text_2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-16 mt-8 text-start md:gap-5">
          {footerDetails.map(({ title, links, id }) => {
            return (
              <div className="flex flex-col flex-1" key={id}>
                <h2 className="mb-3 text-lg font-bold text-linear uppercase">
                  {title}
                </h2>
                <ul className="flex flex-col gap-2">
                  {links.map((item, index) => {
                    return (
                      <li key={index}>
                        <a
                          className="text-sm font-medium hover:text-blue-500"
                          href="#"
                        >
                          {item}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-20 text-base font-semibold text-center ">
          @Copyright 2023. All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
