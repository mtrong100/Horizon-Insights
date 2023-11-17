import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Blog, { BlogSkeleton } from "../modules/Blog";
import useToggle from "../hooks/useToggle";
import RootModal from "../components/modals/RootModal";
import ProfileModal from "../components/modals/ProfileModal";
import useSwitchBlogs from "../hooks/useSwitchBlogs";
import { tabs } from "../utils/constant";
import CardUserInfo from "../components/CardUserInfo";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { handleToggle, toggle } = useToggle();
  const { selected, setSelected, blogs, isLoading } = useSwitchBlogs(
    currentUser?.id
  );

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="flex flex-col">
      {/* Card section */}
      <section className="grid xl:grid-cols-3 gap-5 mb-5">
        <CardUserInfo currentUser={currentUser} isOpenModal={handleToggle} />
        <div className="col-span-2 dashboard-background xl:block hidden rounded-xl shadow-md"></div>
      </section>

      <div className="line-seperate"></div>

      <section className="bg-mainBackground rounded-xl p-5">
        <div className="flex items-center gap-4 mb-5">
          {tabs.map((item) => (
            <TabItem
              key={item}
              setSelected={setSelected}
              item={item}
              selected={selected}
            />
          ))}
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

      <RootModal
        isOpen={toggle}
        onClose={handleToggle}
        title="Profile"
        className="max-w-xl"
      >
        <ProfileModal closeModal={handleToggle} />
      </RootModal>
    </section>
  );
};

export default Dashboard;

function TabItem({ setSelected, item, selected }) {
  return (
    <button
      onClick={() => setSelected(item)}
      key={item}
      className={`${
        selected === item
          ? "bg-buttonColor text-buttonText hover:opacity-90 border-transparent"
          : "border-borderColor text-textColor hover:bg-hoverForeground"
      } font-semibold border transition-all cursor-pointer rounded-full px-5 py-2 `}
    >
      {item}
    </button>
  );
}
