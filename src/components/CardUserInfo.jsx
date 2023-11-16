import React from "react";
import { formateDate } from "../utils/helper";
import Button from "./buttons/Button";
import ThemeButton from "./buttons/ThemeButton";

const CardUserInfo = ({ currentUser, isOpenModal = () => {} }) => {
  return (
    <section className="h-[230px] bg-secondaryColor rounded-xl w-full shadow-md p-5">
      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src={currentUser?.avatar}
          alt="user-avatar"
          className="object-cover w-[80px] h-[80px] rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg mb-2">{currentUser?.username}</h3>
          <div className="text-sm py-1 px-3 font-medium bg-mainBackground rounded-lg">
            {currentUser?.id}
          </div>
        </div>
        <ThemeButton />
      </div>

      <div className="my-3 font-semibold opacity-80">
        <span>Contact: {currentUser?.email}</span>
        <p>Joined {formateDate(currentUser?.createdAt)}</p>
      </div>

      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2 opacity-90">
          <span className="font-semibold">
            {currentUser?.following?.length} Following
          </span>
          <span className="font-semibold">
            {currentUser?.followers?.length} Followers
          </span>
        </div>

        <Button onClick={isOpenModal} className="w-fit py-2 px-4">
          Edit profile
        </Button>
      </div>
    </section>
  );
};

export default CardUserInfo;
