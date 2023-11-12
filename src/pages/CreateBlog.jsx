import React, { useRef, useState } from "react";
import Label from "../components/Label";
import FieldInput from "../components/form/FieldInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldTextarea from "../components/form/FieldTextarea";
import Dropdown from "../components/form/Dropdown";
import { typeBlogs } from "../utils/constant";
import Button from "../components/Button";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser";
import { MdOutlineUploadFile } from "react-icons/md";
import useUploadPhoto from "../hooks/useUploadPhoto";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import slugify from "slugify";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const schema = yup.object().shape({
  title: yup
    .string()
    .min(10, "Title is too short")
    .max(100, "Title is too long")
    .required("Title is required"),
  category: yup
    .string()
    .min(2, "Category is too short")
    .max(15, "Category is too long")
    .required("Category is required"),
  description: yup
    .string()
    .min(10, "Description is too short")
    .max(350, "Description is only at least 300 characters")
    .required("Description is required"),
});

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const { currentUser } = useAuth();
  const [type, setType] = useState("Normal");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const {
    image: thumbnail,
    setImage: setThumbnail,
    progress,
    handleSelectImage,
  } = useUploadPhoto();

  const onSubmit = async (values) => {
    if (!isValid) return;
    if (!type) {
      toast.info("Please choose your type blog!");
      return;
    }
    if (!thumbnail) {
      toast.info("Please upload your thumbnail!");
      return;
    }
    if (!content) {
      toast.info("Please write your content!");
      return;
    }

    try {
      const blogRef = collection(db, "Blog");
      const docRef = await addDoc(blogRef, {
        ...values,
        slug: slugify(values.title, { lower: true }),
        content,
        type,
        thumbnail,
        userId: currentUser?.id,
        createdAt: serverTimestamp(),
      });

      await updateDoc(docRef, {
        id: docRef.id,
      });

      // reset({
      //   title: "",
      //   description: "",
      //   category: "",
      // });
      setThumbnail("");
      // setContent("");
      setType("Normal");

      toast.success("Create blog successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed! Can not create blog");
    }
  };

  return (
    <section>
      <h1 className="text-4xl font-bold text-linear leading-normal">
        Create New Blog
      </h1>

      <div className="grid grid-cols-2 gap-5 mt-4 relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-whiteSoft p-5 rounded-xl flex flex-col gap-5 border border-gray-300"
        >
          <section className="w-full flex flex-col gap-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>

            {progress === 0 && !thumbnail && (
              <div className="border border-gray-500 flex flex-col gap-5 hover:bg-slate-100 cursor-pointer items-center justify-center h-[250px] w-full rounded-xl">
                <MdOutlineUploadFile size={50} className="opacity-50" />
                <input
                  type="file"
                  onChange={handleSelectImage}
                  className="cursor-pointer"
                />
              </div>
            )}

            {progress !== 0 && !thumbnail && (
              <div className="border border-gray-500 flex  gap-5 hover:bg-slate-100 cursor-pointer items-center justify-center h-[250px] w-full rounded-xl">
                <div className="loading-circle"></div>
              </div>
            )}

            {thumbnail && (
              <div className="h-[250px] ">
                <img
                  src={thumbnail}
                  alt="blog-thumbnail"
                  className="img-cover rounded-xl"
                />
              </div>
            )}
          </section>

          <section className="w-full flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <FieldInput
              name="title"
              register={register}
              placeholder="Enter title..."
              error={errors.title?.message}
            />
          </section>

          <section className="w-full flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <FieldInput
              name="category"
              register={register}
              placeholder="Enter category: #tech #coding..."
              error={errors.category?.message}
            />
          </section>

          <section className="w-full flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <FieldTextarea
              name="description"
              register={register}
              placeholder="Enter description..."
              error={errors.description?.message}
            />
          </section>

          <section className="w-full flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Dropdown selected={type} handleSelect={setType} list={typeBlogs} />
          </section>

          <section className="w-full flex flex-col gap-2">
            <Label htmlFor="content">Content</Label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </section>

          <Button type="submit" isLoading={isSubmitting} className="p-4">
            Submit
          </Button>
        </form>

        {/* Preview */}
        <section className="sticky top-5 h-screen overflow-y-auto custom-scrollbar">
          <h1 className="text-3xl mb-2 font-bold text-gray-800 leading-normal ml-2">
            Preview content
          </h1>

          {!content && (
            <div className="flex items-center justify-center mt-20 text-3xl font-bold opacity-50">
              Fill in the form to see preview
            </div>
          )}

          {content && (
            <div className="bg-whiteSoft p-5 rounded-xl border border-gray-300 blog-content">
              {HTMLReactParser(content)}
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default CreateBlog;
