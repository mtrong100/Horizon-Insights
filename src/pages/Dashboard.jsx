import React from "react";
import { useAuth } from "../context/AuthContext";
import { formateDate } from "../utils/helper";
import Blog from "../modules/Blog";

const Dashboard = () => {
  const { currentUser } = useAuth();

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
          <div className="mt-3 font-semibold opacity-80">
            <span>Contact: {currentUser?.email}</span>
            <span className="inline-block ">
              Joined {formateDate(currentUser?.createdAt)}
            </span>
          </div>
        </div>
        <div className="h-[230px] bg-cyanLinear rounded-xl w-full shadow-md"></div>
        <div className="h-[230px] bg-cyanLinear rounded-xl w-full shadow-md"></div>
      </section>

      <div className="w-full h-[2px] bg-gray-400 opacity-50 mb-3"></div>

      <section className="bg-whiteSoft rounded-xl ">
        <div className="flex items-center gap-4 mb-5">
          <span className="font-semibold border-indigo-500 border hover:bg-indigo-500 transition-all cursor-pointer rounded-full text-indigo-500 px-5 py-2 hover:text-white">
            Blog
          </span>
          <span className="font-semibold border-indigo-500 border hover:bg-indigo-500 transition-all cursor-pointer rounded-full text-indigo-500 px-5 py-2 hover:text-white">
            Favorite
          </span>
        </div>
        <ul className="grid grid-cols-3 gap-x-2 gap-y-5 ">
          {Array(6)
            .fill(0)
            .map((item, index) => (
              <Blog key={index} />
            ))}
        </ul>
      </section>
    </section>
  );
};

export default Dashboard;
