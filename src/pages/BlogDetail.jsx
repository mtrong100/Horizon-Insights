import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import parse from "html-react-parser";
import { formateDate } from "../utils/helper";
import Blog, { BlogSkeleton } from "../modules/Blog";
import useFetchCollection from "../hooks/useFetchCollection";
import FollowCard from "../components/FollowCard";
import ButtonFollow from "../components/buttons/ButtonFollow";
import { useAuth } from "../context/AuthContext";
import ButtonLike from "../components/buttons/ButtonLike";
import ButtonComment from "../components/buttons/ButtonComment";
import ButtonShare from "../components/buttons/ButtonShare";
import SidebarComment from "../components/SidebarComment";

const BlogDetail = () => {
  const { slug } = useParams();
  const { currentUser } = useAuth();
  const { data, isLoading } = useQuerySnapshot("Blog", "slug", slug);
  const { data: user } = useQuerySnapshot("User", "id", data?.userId);
  const { data: blogs, isLoading: blogLoading } = useFetchCollection("Blog");

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <React.Fragment>
      <section>
        {isLoading ? (
          <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-xl"></div>
        ) : (
          <div className={`w-full h-[300px]`}>
            <img
              src={data?.thumbnail}
              alt={`blog-thumbnail`}
              className="img-cover rounded-xl"
            />
          </div>
        )}

        {isLoading && (
          <p className="text-4xl opacity-40 font-bold my-10 text-center">
            Loading....
          </p>
        )}
        {!isLoading && data && (
          <div className="bg-whiteSoft p-5 rounded-xl border border-gray-300  mt-3">
            <section className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                {/* Author */}
                <div className="flex items-center gap-3 cursor-pointer mb-5">
                  <img
                    src={user?.avatar}
                    alt="user-avatar"
                    className="object-cover w-[100px] h-[100px] rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-slate-700 text-lg">
                      Post by: {user?.username}
                    </h3>
                    <span className="font-semibold opacity-60 inline-block mt-1">
                      Post: {formateDate(data?.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 border-l-2 pl-5 border-slate-600">
                  <ButtonLike blogId={data?.id} />
                  <ButtonComment blogId={data?.id} />
                </div>
              </div>

              <div className="flex items-center gap-5">
                <ButtonShare />
                {currentUser?.id !== data?.userId && (
                  <ButtonFollow userId={data?.userId} />
                )}
              </div>
            </section>

            <main className="blog-content">{parse(data?.content || "")}</main>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-5 ">
        <FollowCard />

        <div className="p-5 rounded-lg bg-white">
          <h1 className="text-3xl font-bold text-linear leading-normal">
            Explore more
          </h1>
          <ul className="flex flex-col gap-5 mt-5">
            {blogLoading &&
              Array(6)
                .fill(0)
                .map((item, index) => <BlogSkeleton key={index} />)}

            {!blogLoading &&
              blogs &&
              blogs.length > 0 &&
              blogs.map((blog) => <Blog key={blog.id} data={blog} />)}
          </ul>
        </div>

        <SidebarComment blogId={data?.id} />
      </section>
    </React.Fragment>
  );
};

export default BlogDetail;
