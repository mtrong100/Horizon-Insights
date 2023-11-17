import React from "react";
import HeadingTitle from "../components/HeadingTitle";

const Contact = () => {
  return (
    <section className="page-container  mt-20 mb-[200px] flex items-center justify-center flex-col">
      <HeadingTitle className="text-center text-5xl my-5">
        Contact to us
      </HeadingTitle>

      <div className="flex items-center justify-between gap-3 mt-10 lg:mt-0">
        <div className="flex flex-col gap-5 flex-1">
          <input
            type="text"
            className="input-styles "
            placeholder="Enter your username"
          />
          <input
            type="text"
            className="input-styles "
            placeholder="Enter your email"
          />
          <textarea
            cols="30"
            rows="10"
            className="input-styles resize-none "
            placeholder="Write your thoughts..."
          ></textarea>
        </div>

        <div className="flex-shrink-0 flex-1">
          <img
            src="/contact-image.png"
            alt="image"
            className="img-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
