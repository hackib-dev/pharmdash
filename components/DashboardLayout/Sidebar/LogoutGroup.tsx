"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useInitialRender, useToast } from "@/hooks";
import { logoutUser } from "@/store/slice/userService/userService";
import { LogOutIcon, UserCircle } from "lucide-react";

const LogoutUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const initialRenderComplete = useInitialRender();

  const {
    user: { firstName, lastName, userRole },
  } = useAppSelector((state) => state.userService);

  return (
    <div className="relative mt-12">
      <div className="flex items-center justify-between">
        <div className="text-left">
          {initialRenderComplete && (
            <div className="flex items-center gap-3">
              <UserCircle />
              <div className="">
                <p className="font-medium text-black uppercase">
                  {firstName && lastName && firstName + " " + lastName}
                </p>
                <p className="text-[#757575]">{userRole}</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <LogOutIcon
            width={24}
            height={24}
            color="#757575"
            className="hover:cursor-pointer"
            onClick={() => {
              dispatch(logoutUser());
              router.push("/login");
              toast({
                description: "Successfully Logout",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoutUser;
