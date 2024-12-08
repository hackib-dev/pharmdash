"use client";

import _ from "lodash";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignUpFormData } from "@/types.ts";
import { SignUpFormSchema } from "./validations";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import { FaArrowRight } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { loginUser, signUpUser } from "@/app/api/apiService";
import Whatsapp from "@/assets/images/whatsapp.svg";
import { useCallback, useEffect, useState } from "react";
import BgImage from "@/assets/bgImage.svg";
import Mark from "@/assets/images/mark.svg";
import { useDropzone } from "react-dropzone";
import User from "../../../assets/images/user.svg";
import Camera from "../../../assets/images/camera.svg";
import { useSignUpMutation } from "@/app/queryHandler/useMutation";
import Link from "next/link";

const SignUp = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      userRole: "USER",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { mutate: signUp, isPending, data: signUpData } = useSignUpMutation();

  useEffect(() => {
    if (signUpData) {
      router.push("/login");
      form.reset();
    }
  }, [form, router, signUpData]);

  const onSubmit = async (data: SignUpFormData) => {
    if (!_.isEmpty(form.formState.errors)) {
      return;
    }

    const { password, confirmPassword } = data;
    const { confirmPassword: formPassword, ...apiData } = data;

    if (password !== confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    form.clearErrors("confirmPassword");

    signUp(apiData);
  };

  const handleLogin = () => {
    router.push("login");
  };

  const bgImage = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
  };

  const watchedFields = form.watch();

  const isFormComplete = Object.values(watchedFields).every(
    (field) => field === undefined || field === ""
  );

  return (
    <div className="grid md:grid-cols-2  h-screen">
      <div
        className="bg-[url('../assets/loginBg.jpg')] relative  hidden md:flex justify-center items-center relat"
        style={bgImage}
      >
        <div className="absolute bottom-0">
          <BgImage />
        </div>
      </div>

      <div className="px-7 flex flex-col justify-center md:justify-normal overflow-auto h-screen align-middle py-14">
        <div className="align-middle mx-auto min-w-full lg:min-w-[400px] md:min-w-[400px] ">
          <h2 className="mb-2 text-xl font-bold">Sign Up</h2>
          <p className="text-gray-500 text-xs mb-5">
            Enter your details to create your account
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase">
                      first name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="Enter your first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase">
                      last name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="Enter your last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase">
                      user role
                    </FormLabel>
                    <FormControl>
                      <Input className="text-xs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      {`password`.toUpperCase()}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="Enter Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase">
                      confirm password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="Re-enter your Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3 pt-5">
                <Button
                  className="w-full"
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  isFormComplete={isFormComplete}
                >
                  {isPending && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign Up Account
                </Button>
                <p className="text-right text-sm text-gray-500">
                  Already have an account?
                  <span
                    className="ml-1 text-btnprimary cursor-pointer font-medium"
                    onClick={handleLogin}
                  >
                    Log In
                  </span>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
