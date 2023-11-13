import React, { useEffect, useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

const ButtonScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the website
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  // Function to show/hide the button based on scroll position
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`rounded-full fixed z-50 bottom-20 lg:bottom-28 xl:bottom-10 right-5 md:bottom-24 md:right-10 shadow-lg text-white  lg:right-10 hover:bg-indigo-600 w-[45px] h-[45px] items-center justify-center bg-indigo-500 ${
        isVisible ? "flex" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <BiUpArrowAlt size={25} />
    </button>
  );
};

export default ButtonScrollTop;
