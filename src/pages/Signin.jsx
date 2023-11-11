import React from "react";
import FieldInput from "../components/form/FieldInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/Button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Label from "../components/Label";
import FieldInputPassword from "../components/form/FieldInputPassword";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Signin = () => {
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
      password: "",
      email: "",
    },
  });

  const onSubmit = async (values) => {
    if (!isValid) return;

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);

      reset({
        password: "",
        email: "",
      });

      toast.success("Welcome to chat app!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h1 className="text-4xl text-center text-blue-600 font-bold">
          Money Blogging
        </h1>

        <div className="flex flex-col gap-5 mt-5">
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
            Not have an account?{" "}
            <Link className="hover:underline text-blue-500" to="/sign-up">
              Sign up
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

export default Signin;
