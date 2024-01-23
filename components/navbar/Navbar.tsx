"use client";

import { logout } from "@/actions/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { menusData } from "@/data/menus";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExitIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";
import { FaSpinner, FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown, MdOutlineNotifications } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { LoginButton } from "../auth/login-button";
import ContextMenu from "../common/ContextMenu";
import { LanguageButton } from "../common/Language-button";
import Wrapper from "../common/Wrapper";
import Logo from "../header/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = ({ locale }: any) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const user = useCurrentUser();
  const [selectedMenu, setSelectedMenu] = useState(pathname);

  const contextMenuOptions = [
    {
      name: "Home",
      callBack: () => {
        router.push("/");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Login User",
      callBack: () => {},
    },
  ];

  const authenticatedUserContextMenuOptions = [
    {
      name: "Home",
      callBack: () => {
        router.push("/");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Wallet",
      callBack: () => {
        router.push("/user/wallet");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "KYC Verification",
      callBack: () => {
        router.push("/user/kyc");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Logout",
      callBack: () => {
        logout();
        setIsContextMenuVisible(false);
      },
    },
  ];

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  return (
    <header
      className={`fixed z-[20]  px-5 pr-2 lg:px-8 py-2 w-full left-0 right-0 top-0 h-[8vh] ${
        scrolled ? "bg-[var(--clr-primary-light)]" : "bg-transparent "
      }`}
    >
      <Wrapper>
        <div className="flex items-center justify-between w-full">
          <div className=" flex items-center justify-center rounded-md">
            <Logo />
          </div>

          <div className="flex items-center ">
            {session?.status === "authenticated" ? (
              <>
                <LanguageButton asChild mode="modal">
                  <div className=" h-[38px]   rounded-full p-2 px-2 flex items-center justify-center bg-[var(--clr-primary)] shadow-md hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer mr-4">
                    <div className="group flex items-center gap-1">
                      <BiWorld className="text-xl" />
                      <MdKeyboardArrowDown className=" group-hover:rotate-180 transition-all duration-300" />
                    </div>
                  </div>
                </LanguageButton>

                <div className=" h-[38px]   rounded-full p-2 px-2 flex items-center justify-center bg-[var(--clr-primary)] shadow-md hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer mr-4">
                  <div className="group flex items-center gap-1">
                    <MdOutlineNotifications className="text-2xl" />
                    {/* <MdKeyboardArrowDown className=" group-hover:rotate-180 transition-all duration-300" /> */}
                  </div>
                </div>

                <div
                  className=" h-[40px]   rounded-full p-4 px-2 flex items-center justify-center bg-[var(--clr-primary)] shadow-md hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  // onClick={() => setIsContextMenuVisible(true)}
                >
                  {session?.status === "authenticated" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-[30px] h-[30px] relative">
                            <Suspense
                              fallback={<FaSpinner className="animate-spin" />}
                            >
                              <AvatarImage
                                src={session?.data?.user?.image || ""}
                              />
                            </Suspense>
                            <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                              {session?.data?.user?.name
                                ?.split("")
                                ?.shift()
                                ?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <RxHamburgerMenu />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="rounded-[5px] w-56 py-5">
                        {menusData?.map((menu) => {
                          const newPath =
                            locale === "en"
                              ? menu.path
                              : menu.path === "/"
                              ? `/${locale}`
                              : `/${locale}${menu.path}`;

                          return (
                            <DropdownMenuItem
                              asChild
                              className={`px-4 ${
                                newPath === selectedMenu && "bg-slate-100"
                              } `}
                              onClick={() => setSelectedMenu(newPath)}
                              key={menu.key}
                            >
                              <Link href={newPath}>{menu.title}</Link>
                            </DropdownMenuItem>
                          );
                        })}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => logout()}
                          className="px-4"
                        >
                          <ExitIcon className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-[30px] h-[30px] relative">
                        <AvatarFallback className="bg-gray-500 h-[30px] w-[30px]">
                          <FaUser className="text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <RxHamburgerMenu />
                    </div>
                  )}
                </div>
                {isContextMenuVisible && (
                  <ContextMenu
                    contextMenu={isContextMenuVisible}
                    setContextMenu={setIsContextMenuVisible}
                    cordinates={{ x: window.innerWidth - 280, y: 70 }}
                    options={
                      // userInfo ? authenticatedContextMenuOptions : contextMenuOptions
                      session?.status === "authenticated" &&
                      authenticatedUserContextMenuOptions
                    }
                    locale={locale}
                  />
                )}
              </>
            ) : (
              <>
                <LoginButton asChild locale={locale} mode="modal">
                  <div className="w-[178px] h-[44px] rounded-[40px] shadow-lg bg-[var(--clr-secondary-light)]  flex items-center justify-between pl-4 text-[14px] font-bold text-[var(--clr-primary)] hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div>
                      <p>Login</p>
                    </div>
                    <div className="w-[94px] h-full rounded-[40px] shadow-lg bg-[var(--clr-secondary)]  flex items-center justify-center">
                      <p>Sign Up</p>
                    </div>
                  </div>
                </LoginButton>
              </>
            )}
          </div>
        </div>
      </Wrapper>

      {/* {session?.status === "authenticated" ? ( */}

      {/* // ) : (
      //   <>
      //     <div className="w-[178px] h-[50px] rounded-[40px] shadow-lg"></div>
      //   </>
      // )} */}
    </header>
  );
};

export default Navbar;
