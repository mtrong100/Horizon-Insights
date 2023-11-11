import React from "react";
import Banner from "../components/Banner";
import { blogCategories } from "../utils/constant";
import FeatureBlog from "../modules/FeatureBlog";
import Blog from "../modules/Blog";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <main className="page-container py-5">
      <Banner />

      {/* Category */}
      <section className="py-5">
        <h1 className="text-4xl font-bold text-linear leading-normal">
          Exlpore Categories
        </h1>
        <ul className="flex items-center gap-5 mt-3">
          {blogCategories.map((item) => (
            <li
              className="font-semibold bg-indigo-500 hover:bg-indigo-600 cursor-pointer rounded-full text-whiteSoft px-5 py-1"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Blogs */}
      <section className="my-5">
        <FeatureBlog />
        <ul className="mt-8 grid grid-cols-3 gap-x-2 gap-y-5 ">
          {Array(6)
            .fill(0)
            .map((item, index) => (
              <Blog key={index} />
            ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
