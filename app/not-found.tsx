"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";

const UnauthorizedPage = () => {
  const router = useRouter();

  const {
    user: { isAuthenticated },
  } = useAppSelector((state) => state.userService);

  const handleUnauthorizedClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  const page = isAuthenticated ? "Return to Dashboard" : "Return to Login Page";

  return (
    <div className="flex flex-col text-center items-center justify-center h-screen">
      <p className="mb-5 uppercase text-2xl font-bold">
        We are sorry, your request is unauthorized
      </p>
      <p className="mb-5 uppercase font-medium">{`please click the button below to ${page}`}</p>
      <Button variant="default" onClick={handleUnauthorizedClick}>
        {page}
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
