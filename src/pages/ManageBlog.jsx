import React, { useState } from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import BlogItem from "../components/BlogItem";
import useOnchange from "../hooks/useOnchange";
import { filterOption } from "../utils/constant";

const ManageBlog = () => {
  const { data: blogs, isLoading } = useFetchCollection("Blog");
  const { value, handleChange } = useOnchange();
  const [filter, setFilter] = useState("all");

  // Hanlde filter
  const filteredBlogs = blogs.filter((item) => {
    const queryBlogs = item.title.toLowerCase().includes(value.toLowerCase());
    if (filter === "all") {
      return queryBlogs;
    } else {
      return item.type === filter && queryBlogs;
    }
  });

  return (
    <section className="p-5 rounded-lg bg-whiteSoft">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-linear leading-normal">
          Manage blogs
        </h1>

        <div className="flex items-center gap-2 w-full max-w-sm">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Search your blog..."
            className="p-3 outline-none rounded-md border w-full bg-transparent border-gray-500 focus:border-blue-400"
          />

          <select
            onChange={(e) => setFilter(e.target.value)}
            id="cars"
            className="border p-2 border-gray-500 rounded-md"
          >
            {filterOption.map((item) => (
              <option value={item.value} key={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full h-[2px] bg-slate-200 my-5"></div>

      {/* Main */}
      <div className="mt-5 flex flex-col gap-5">
        {isLoading && (
          <p className="text-3xl font-bold opacity-50 text-center my-10">
            Loading...
          </p>
        )}

        {!isLoading &&
          filteredBlogs &&
          filteredBlogs.length > 0 &&
          filteredBlogs.map((blog) => <BlogItem key={blog.id} data={blog} />)}
      </div>
    </section>
  );
};

export default ManageBlog;
