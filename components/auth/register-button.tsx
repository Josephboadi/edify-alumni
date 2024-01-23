"use client";

import { useRouter } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  locale: string;
  asChild?: boolean;
}

export const RegisterButton = ({
  children,
  mode = "redirect",
  locale,
  asChild,
}: RegisterButtonProps) => {
  const router = useRouter();

  // const onClick = () => {
  //   router.push(`/${locale}/auth/login`);
  // };

  // if (mode === "modal") {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <RegisterForm />
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
