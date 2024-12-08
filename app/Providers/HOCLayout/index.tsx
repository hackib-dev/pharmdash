/* eslint-disable no-console */

"use client";

import _ from "lodash";
import { usePathname, redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DASHBOARD_ROUTE, GUEST_ROUTES } from "@/app/config";
import { useToast } from "@/hooks";
import { getCookie } from "@/app/utils/cookies";
import { logoutUser } from "@/store/slice/userService/userService";
import Loading from "@/components/Loading";

export const HOCLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const {
    user: { isAuthenticated },
  } = useAppSelector((state) => state.userService);
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => setLoader(false), 1500);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logoutUser());
      router.push("/login");
    } else if (!isAuthenticated && DASHBOARD_ROUTE.includes(pathname)) {
      router.push("/login");
    } else if (isAuthenticated && GUEST_ROUTES.includes(pathname)) {
      toast({
        variant: "destructive",
        title: "You are logged in",
      });
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loader ? <Loading /> : <div>{children}</div>;
};
