"use client";

import { useRouter } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { RegisterForm } from "./register-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  locale: string;
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  locale,
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const { formType } = useAppStore();

  // console.log(formType);

  // const onClick = () => {
  //   router.push(`/${locale}/auth/login`);
  // };

  // if (mode === "modal") {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none !z-[10000000]">
        {formType === "login" ? (
          <LoginForm locale={locale} />
        ) : (
          <RegisterForm locale={locale} />
        )}
      </DialogContent>
    </Dialog>
  );
  // }

  // return (
  //   <span onClick={onClick} className="cursor-pointer">
  //     {children}
  //   </span>
  // );
};
