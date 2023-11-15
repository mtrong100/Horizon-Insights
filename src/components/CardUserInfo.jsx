import React from "react";
import { formateDate } from "../utils/helper";

const CardUserInfo = ({ currentUser, isOpenModal = () => {} }) => {
  return (
    <section className="h-[230px] bg-whiteSoft rounded-xl w-full shadow-md p-5">
      <div className="flex items-start justify-between">
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

        <button
          onClick={isOpenModal}
          className="border border-blue-500 text-sm hover:bg-blue-500 hover:text-white text-blue-500 py-2 px-3 rounded-lg font-medium"
        >
          Edit profile
        </button>
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
    </section>
  );
};

export default CardUserInfo;
