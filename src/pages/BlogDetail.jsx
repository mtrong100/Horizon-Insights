import React from "react";
import { useParams } from "react-router-dom";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import parse from "html-react-parser";
import { formateDate } from "../utils/helper";

const BlogDetail = () => {
  const { slug } = useParams();
  const { data, isLoading } = useQuerySnapshot("Blog", "slug", slug);
  const { data: user } = useQuerySnapshot("User", "id", data?.userId);

  return (
    <section className=" py-10 page-container">
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
          <div className="flex items-center gap-3 cursor-pointer mb-5">
            <img
              src={user?.avatar}
              alt="user-avatar"
              className="object-cover w-[100px] h-[100px] rounded-full"
            />
            <div>
              <h3 className="font-bold text-slate-700 text-lg">
                Upload by: {user?.username}
              </h3>
              <span className="font-semibold opacity-60 inline-block mt-1">
                Post: {formateDate(data?.createdAt)}
              </span>
            </div>
          </div>

          <main className="blog-content">{parse(data?.content || "")}</main>
        </div>
      )}
    </section>
  );
};

export default BlogDetail;
