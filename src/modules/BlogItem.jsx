import React from "react";
import BlogType from "./BlogType";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import { formateDate } from "../utils/helper";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Tab from "../components/Tab";

const BlogItem = ({ data }) => {
  const { data: user } = useQuerySnapshot("User", "id", data?.userId);

  const handleDeleteBlog = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire("Deleted!", "Your blog has been deleted.", "success");
          const blogDocRef = doc(db, "Blog", blogId);
          await deleteDoc(blogDocRef);
        } catch (error) {
          console.log(error);
          toast.error("Failed! Can not delete blog");
        }
      }
    });
  };

  return (
    <article className="flex items-center justify-between">
      <div className="flex items-start gap-3">
        <div className="w-[200px] h-[150px]">
          <img
            src={data?.thumbnail}
            alt="blog-thumbnail"
            className="rounded-lg img-cover "
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="capitalize font-bold text-sm bg-forcegroundColor bg-opacity-20 text-textColor w-fit px-5 py-2 rounded-full ">
              {data?.category}
            </span>
            <BlogType category={data?.type} />
          </div>
          <h1 className="text-xl font-semibold ">{data?.title}</h1>
          <span className="font-semibold opacity-80">By: {user?.username}</span>
          <span className="font-medium">{formateDate(data?.createdAt)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link to={`/edit-blog/${data?.id}`} className="edit-button">
          Edit
        </Link>
        <button
          onClick={() => handleDeleteBlog(data?.id)}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default BlogItem;
