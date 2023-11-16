import React from "react";
import FieldInput from "../components/form/FieldInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Label from "../components/Label";
import FieldInputPassword from "../components/form/FieldInputPassword";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Button from "../components/buttons/Button";
import { profileImage } from "../utils/constant";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Username is too short")
    .max(18, "Username can not exceed 18 characters")
    .required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
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
      email: "",
    },
  });

  const onSubmit = async (values) => {
    if (!isValid) return;

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      const userRef = collection(db, "User");
      const userDocRef = await addDoc(userRef, {
        ...values,
        avatar: profileImage,
        following: [],
        followers: [],
        createdAt: serverTimestamp(),
      });

      await updateDoc(userDocRef, {
        id: userDocRef.id,
      });

      reset({
        username: "",
        password: "",
        email: "",
      });
      toast.success("Welcome to Horizon Blog!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("This account is already exist!");
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-secondaryColor">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg border border-borderColor p-5 rounded-xl bg-mainBackground"
      >
        <h1 className="text-4xl text-center  font-bold ">Horizon Insights</h1>

        <div className="flex flex-col gap-5 mt-8">
          <section className="w-full flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <FieldInput
              name="username"
              register={register}
              placeholder="Enter username..."
              error={errors.username?.message}
            />
          </section>

          <section className="w-full flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <FieldInput
              name="email"
              register={register}
              placeholder="Enter email..."
              error={errors.email?.message}
            />
          </section>

          <section className="w-full flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <FieldInputPassword
              name="password"
              register={register}
              placeholder="Enter password..."
              error={errors.password?.message}
            />
          </section>

          <div className="text-sm font-medium">
            Already have an account?{" "}
            <Link className="hover:underline text-activeColor" to="/sign-in">
              Sign in
            </Link>
          </div>

          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
