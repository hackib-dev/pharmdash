import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutUser from "./LogoutGroup";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ActivityIcon, SettingsIcon, User } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const lastSlashIndex = pathname.lastIndexOf("/");
  const pageName = pathname.substring(lastSlashIndex + 1);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const menu = useRef<any>(null);

  const storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target) ||
        open
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 bg-[#FAFBFF]  shadow-md text-black z-50 flex h-screen w-72 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-4 mt-3">
        <Link
          href="/dashboard"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex gap-2 items-center"
        >
          <div className="flex items-baseline gap-1">
            <p className="font-bold uppercase text-xl"> PharmDash</p>
          </div>
        </Link>

        <button
          type="button"
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5  px-6 lg:mt-2 lg:px-2">
          <div>
            <ul className="mb-6 flex flex-col gap-2">
              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Link
                  href="/dashboard"
                  className={`relative text-sm flex items-center gap-2 rounded-md py-3 px-4 font-medium  duration-300 ease-in-out mx-0 md:mx-4    ${
                    pageName.includes("dashboard") && "bg-[#5932EA] text-white"
                  }`}
                >
                  <User />
                  Dashboard
                  <span className="absolute right-4">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 9L5 5L1 1"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>

              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Link
                  href="/dashboard/pharmacy-actions"
                  className={`relative text-sm flex items-center gap-2 rounded-md py-3 px-4 font-medium  duration-300 ease-in-out mx-1 md:mx-4    ${
                    pageName.includes("pharmacy-actions") &&
                    "bg-[#5932EA] text-white"
                  }`}
                >
                  <SettingsIcon />
                  Pharmacy Actions
                  <span className="absolute right-4">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 9L5 5L1 1"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="absolute w-full bottom-5 no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <div className="mt-5  px-4 lg:mt-2 lg:px-6">
            <LogoutUser />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
