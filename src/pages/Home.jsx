import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import FeatureBlog, { FeatureBlogSkeleton } from "../modules/FeatureBlog";
import Blog, { BlogSkeleton } from "../modules/Blog";
import { useAuth } from "../context/AuthContext";
import useFetchCollection from "../hooks/useFetchCollection";
import useFetchBlogType from "../hooks/useFetchBlogType";
import { Link } from "react-router-dom";
import slugify from "slugify";
import HeadingTitle from "../components/HeadingTitle";

const Home = () => {
  const { currentUser } = useAuth();
  const { data: blogs, isLoading } = useFetchCollection("Blog");
  const [categories, setCategories] = useState([]);
  const { data: featureBlogs, isLoading: loading } = useFetchBlogType(
    "Blog",
    "Feature"
  );
  const [firstBlog, ...rest] = featureBlogs;

  // Filter unique categories from blogs
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const uniqueCategories = [...new Set(blogs.map((blog) => blog.category))];
      setCategories(uniqueCategories);
    }
  }, [blogs]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="page-container py-5">
      <Banner />

      {/* Category */}
      <section className="py-5">
        <HeadingTitle>Exlpore Categories</HeadingTitle>
        <ul className="flex items-center gap-5 mt-3">
          {categories.length > 0 &&
            categories.map((item) => {
              const categorySlug = slugify(item, { lower: true });

              return (
                <Link
                  to={`/category/${categorySlug}`}
                  className="font-semibold capitalize border-indigo-500 border hover:bg-indigo-500 transition-all cursor-pointer rounded-full text-indigo-500 px-5 py-2 hover:text-white"
                  key={item}
                >
                  {item}
                </Link>
              );
            })}
        </ul>
      </section>

      {/* Blogs */}
      <section className="my-5">
        {loading ? <FeatureBlogSkeleton /> : <FeatureBlog data={firstBlog} />}

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
