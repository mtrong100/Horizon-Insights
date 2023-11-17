import React from "react";
import FieldInput from "../components/form/FieldInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Label from "../components/Label";
import FieldInputPassword from "../components/form/FieldInputPassword";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import Button from "../components/buttons/Button";

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

      toast.success("Welcome to Horizon Blog!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("This account is not exist!");
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-secondaryColor px-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg border border-borderColor p-5 rounded-xl bg-mainBackground"
      >
        <h1 className="text-4xl text-center font-bold">Horizon Insights</h1>

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
            <Link className="hover:underline text-activeColor" to="/sign-up">
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
