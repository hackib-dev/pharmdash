import { Menu, SearchIcon, X } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Input } from "@/components/ui/input";
import { useInitialRender } from "@/hooks";
import { getCurrentDateTime } from "@/app/utils/reusable";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const {
    user: { firstName, lastName, userRole },
  } = useAppSelector((state) => state.userService);

  const isInitialRenderComplete = useInitialRender();

  return (
    <header className="sticky top-0 z-40 flex w-full bg-[#FAFBFF] shadow-md ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            type="button"
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke  p-2 shadow-sm  lg:hidden"
          >
            <span className="relative block h-6 w-6 cursor-pointer">
              <span className="block absolute right-0 h-full w-full">
                <Menu />
              </span>
            </span>
          </button>
        </div>

        <div className="hidden md:flex  items-center justify-between w-full">
          <p className="text-lg font-medium">
            Welcome,{" "}
            {isInitialRenderComplete && (
              <span>Pharm. {firstName + " " + lastName}👋🏽</span>
            )}
          </p>

          <p className="font-medium text-sm">{getCurrentDateTime()}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
