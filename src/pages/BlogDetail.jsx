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
import Skeleton from "../components/Skeleton";

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
          <Skeleton className="w-full h-[300px] rounded-xl" />
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
          <div className="bg-secondaryColor p-5 rounded-xl mt-3">
            <section className="flex items-start flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex flex-col md:flex-row items-start md:items-center  md:gap-5">
                {/* Author */}
                <div className="flex items-center gap-3 cursor-pointer mb-5">
                  <img
                    src={user?.avatar}
                    alt="user-avatar"
                    className="object-cover md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-full"
                  />
                  <div>
                    <h3 className="font-bold  text-lg">
                      Post by: {user?.username}
                    </h3>
                    <span className="font-semibold opacity-60 inline-block mt-1">
                      Post: {formateDate(data?.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 md:border-l-2 md:pl-5 border-slate-600">
                  <ButtonLike blogId={data?.id} />
                  <ButtonComment blogId={data?.id} />
                </div>
              </div>

              <div className="flex items-center gap-5">
                <ButtonShare slug={data?.slug} />
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

        <div className="p-5 rounded-lg bg-secondaryColor">
          <h1 className="text-3xl font-bold text-linear leading-normal">
            Explore more
          </h1>
          <ul className="grid md:grid-cols-2 xl:flex xl:flex-col gap-5 mt-5">
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
