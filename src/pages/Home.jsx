import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import FeatureBlog, { FeatureBlogSkeleton } from "../modules/FeatureBlog";
import Blog, { BlogSkeleton } from "../modules/Blog";
import { useAuth } from "../context/AuthContext";
import useFetchCollection from "../hooks/useFetchCollection";
import useFetchBlogType from "../hooks/useFetchBlogType";
import { useLocation } from "react-router-dom";
import slugify from "slugify";
import HeadingTitle from "../components/HeadingTitle";
import { useDispatch } from "react-redux";
import { setSidebarOpen } from "../redux/slices/globalSlice";
import Tab from "../components/Tab";

const Home = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
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
    if (location.pathname === "/") {
      dispatch(setSidebarOpen(false));
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const filteredBlogs = blogs.filter((item) => item.id !== firstBlog.id);

  return (
    <main className="page-container md:py-5">
      <Banner />

      {/* Category */}
      <section className="md:py-5">
        <HeadingTitle>Exlpore Categories</HeadingTitle>
        <ul className="flex items-center gap-2 md:gap-5 mt-3 w-full overflow-x-auto scrollbar-tab pb-3">
          {categories.length > 0 &&
            categories.map((item) => {
              const categorySlug = slugify(item, { lower: true });

              return (
                <Tab key={item} link={`/category/${categorySlug}`}>
                  {item}
                </Tab>
              );
            })}
        </ul>
      </section>

      {/* Blogs */}
      <section className="my-5">
        {loading ? (
          <FeatureBlogSkeleton />
        ) : (
          <FeatureBlog data={firstBlog} currentUser={currentUser} />
        )}

        <ul className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5 ">
          {isLoading &&
            Array(6)
              .fill(0)
              .map((item, index) => <BlogSkeleton key={index} />)}

          {!isLoading &&
            filteredBlogs &&
            filteredBlogs.length > 0 &&
            filteredBlogs.map((blog) => <Blog key={blog.id} data={blog} />)}
        </ul>
      </section>
    </main>
  );
};

export default Home;
