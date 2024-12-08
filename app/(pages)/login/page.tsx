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
import { LoginFormData } from "@/types.ts";
import { LoginFormSchema } from "./validations";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import BgImage from "@/assets/bgImage.svg";
import { useToast } from "@/hooks/use-toast";
import { useLoginMutation } from "@/app/queryHandler/useMutation";
import { useEffect } from "react";
import { addMilliseconds } from "date-fns";
import { setCookie } from "@/app/utils/cookies";
import { setUser } from "@/store/slice/userService/userService";
import Link from "next/link";

const LoginPage = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { mutate: login, isPending, data } = useLoginMutation();

  useEffect(() => {
    if (data) {
      const { jwt, email, firstName, lastName, userRole } =
        data?.data?.data || {};
      dispatch(
        setUser({
          jwt,
          isAuthenticated: Boolean(jwt),
          email,
          firstName,
          lastName,
          userRole,
        })
      );

      router.push("/dashboard");
    }
  }, [router, data, dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    if (!_.isEmpty(form.formState.errors)) {
      return;
    }

    login(data);
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

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="grid md:grid-cols-2  h-screen">
      <div
        className="bg-[url('../assets/loginBg.jpg')] relative  hidden md:flex justify-center items-center"
        style={bgImage}
      >
        <div className="absolute bottom-0">
          <BgImage />
        </div>
      </div>

      <div className="col-span-1 px-7 flex flex-col justify-center  min-h-full">
        <div className="align-middle mx-auto min-w-full lg:min-w-[400px] md:min-w-[400px] ">
          <h2 className="mb-2 text-xl font-bold">Log In</h2>
          <p className="text-gray-500 text-xs mb-10">
            Enter your credentials to access your account
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Log into Account
              </Button>
              <p className="text-right text-sm text-gray-500">
                Are you new here?
                <span
                  className="ml-1 text-btnprimary cursor-pointer font-medium"
                  onClick={handleSignUp}
                >
                  Create Account
                </span>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
