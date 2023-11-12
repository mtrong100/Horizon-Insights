import React from "react";
import Banner from "../components/Banner";
import { blogCategories } from "../utils/constant";
import FeatureBlog from "../modules/FeatureBlog";
import Blog, { BlogSkeleton } from "../modules/Blog";
import { useAuth } from "../context/AuthContext";
import useFetchCollection from "../hooks/useFetchCollection";

const Home = () => {
  const { currentUser } = useAuth();
  const { data: blogs, isLoading } = useFetchCollection("Blog");
  // console.log(currentUser);

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
              className="font-semibold border-indigo-500 border hover:bg-indigo-500 transition-all cursor-pointer rounded-full text-indigo-500 px-5 py-1 hover:text-white"
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
          {isLoading &&
            Array(6)
              .fill(0)
              .map((item, index) => <BlogSkeleton key={index} />)}

          {!isLoading &&
            blogs &&
            blogs.length > 0 &&
            blogs.map((blog) => <Blog key={blog.id} data={blog} />)}
        </ul>
      </section>
    </main>
  );
};

export default Home;
