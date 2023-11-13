import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { formateDate } from "../utils/helper";
import Blog, { BlogSkeleton } from "../modules/Blog";
import useQueryCollection from "../hooks/useQueryCollection";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { data: blogs, isLoading } = useQueryCollection(
    "Blog",
    "userId",
    currentUser?.id,
    "desc"
  );

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="flex flex-col ">
      {/* Statistic card */}
      <section className="grid grid-cols-3 gap-5 mb-10">
        <div className="h-[230px] bg-whiteSoft rounded-xl w-full shadow-md p-5">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={currentUser?.avatar}
              alt="user-avatar"
              className="object-cover w-[80px] h-[80px] rounded-full"
            />
            <div>
              <h3 className="font-bold text-slate-700 text-lg mb-2">
                {currentUser?.username}
              </h3>
              <div className="text-sm py-1 px-3 font-medium bg-gray-200 rounded-lg">
                {currentUser?.id}
              </div>
            </div>
          </div>

          <div className="my-3 font-semibold opacity-80">
            <span>Contact: {currentUser?.email}</span>
            <p className="text-blue-700">
              Joined {formateDate(currentUser?.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2 opacity-90">
            <span className="font-semibold">
              {currentUser?.following?.length} Following
            </span>
            <span className="font-semibold">
              {currentUser?.followers?.length} Followers
            </span>
          </div>
        </div>
        <div className="h-[230px] bg-cyanLinear rounded-xl w-full shadow-md"></div>
        <div className="h-[230px] bg-cyanLinear rounded-xl w-full shadow-md"></div>
      </section>

      <div className="w-full h-[2px] bg-gray-400 opacity-50 mb-3"></div>

      <section className="bg-whiteSoft rounded-xl p-5">
        <div className="flex items-center gap-4 mb-5">
          <span className="font-semibold border-indigo-500 border hover:bg-indigo-500 transition-all cursor-pointer rounded-full text-indigo-500 px-5 py-2 hover:text-white">
            Blog
          </span>
          <span className="font-semibold border-indigo-500 border hover:bg-indigo-500 transition-all cursor-pointer rounded-full text-indigo-500 px-5 py-2 hover:text-white">
            Favorite
          </span>
        </div>

        {!isLoading && blogs.length === 0 && (
          <p className="opacity-50 font-bold text-3xl text-center my-10 ">
            You don't have any blogs
          </p>
        )}

        <ul className="grid grid-cols-3 gap-x-2 gap-y-5 ">
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
    </section>
  );
};

export default Dashboard;
