import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FieldInput from "../form/FieldInput";
import FieldInputPassword from "../form/FieldInputPassword";
import { toast } from "sonner";
import { FaCamera } from "react-icons/fa";
import Button from "../buttons/Button";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import useUploadPhoto from "../../hooks/useUploadPhoto";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Username is too short")
    .max(18, "Username is too long")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const ProfileModal = ({ closeModal = () => {} }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { currentUser } = useAuth();
  const { image, setImage, progress, handleSelectImage } = useUploadPhoto();

  useEffect(() => {
    if (currentUser) {
      reset({
        username: currentUser.username,
        password: currentUser.password,
      });
      setImage(currentUser.avatar);
    }
  }, [currentUser, reset, setImage]);

  const onSubmit = async (values) => {
    if (!isValid) return;

    try {
      const userDoc = doc(db, "User", currentUser?.id);
      await updateDoc(userDoc, {
        ...values,
        avatar: image ? image : currentUser?.avatar,
      });

      setImage("");
      closeModal();
      window.location.reload();
      toast.success("Update profile successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error update profile!");
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center flex-col gap-5">
        {/* User Avatar */}

        <section>
          {progress !== 0 && !image && (
            <div className="h-[150px]">
              <div className="border-4 border-t-4 border-t-transparent w-[50px] h-[50px] rounded-full border-buttonColor animate-spin"></div>
            </div>
          )}

          {image && (
            <div className="w-[150px] h-[150px] flex-shrink-0 relative">
              <img
                src={image}
                alt="user-avatar"
                className="img-cover rounded-full"
              />

              <div className="icon-camera">
                <input
                  onChange={handleSelectImage}
                  type="file"
                  id="upload"
                  className="hidden-input"
                />
                <label htmlFor="upload" className="cursor-pointer">
                  <FaCamera size={18} />
                </label>
              </div>
            </div>
          )}
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-mainBackground rounded-md font-medium opacity-70">
              crowbar0910@gmail.com
            </div>
            <div className="p-3 bg-mainBackground rounded-md font-medium opacity-70">
              kZoIblIFffcmiISkMauo5KC4YE12
            </div>
            <FieldInput
              name="username"
              register={register}
              placeholder="Enter username..."
              error={errors.username?.message}
            />
            <FieldInputPassword
              name="password"
              register={register}
              placeholder="Enter password..."
              error={errors.password?.message}
            />
          </section>

          <Button isLoading={isSubmitting} type="submit" className="mt-3">
            Update
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ProfileModal;
