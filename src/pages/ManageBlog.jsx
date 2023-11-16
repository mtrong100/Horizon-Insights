import React, { useState } from "react";
import useOnchange from "../hooks/useOnchange";
import { filterOption } from "../utils/constant";
import BlogItem from "../modules/BlogItem";
import { useAuth } from "../context/AuthContext";
import useQueryCollection from "../hooks/useQueryCollection";
import SearchBox from "../components/SearchBox";

const ManageBlog = () => {
  const { currentUser } = useAuth();
  const { data: blogs, isLoading } = useQueryCollection(
    "Blog",
    "userId",
    currentUser?.id,
    "desc"
  );

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
    <section className="p-5 rounded-lg bg-secondaryColor">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-linear leading-normal">
          Manage blogs
        </h1>

        <div className="flex items-center gap-2 w-full max-w-sm">
          <SearchBox value={value} onChange={handleChange} />

          <select
            onChange={(e) => setFilter(e.target.value)}
            id="cars"
            className="border bg-mainBackground p-2 border-borderColor rounded-md"
          >
            {filterOption.map((item) => (
              <option value={item.value} key={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full h-[2px] bg-borderColor my-5"></div>

      {/* Main */}
      <div className="mt-5 flex flex-col gap-5">
        {isLoading && (
          <p className="text-3xl font-bold opacity-50 text-center my-10">
            Loading...
          </p>
        )}

        {!isLoading && filteredBlogs.length === 0 && (
          <p className="text-3xl font-bold opacity-50 text-center my-10">
            No blogs found!
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
