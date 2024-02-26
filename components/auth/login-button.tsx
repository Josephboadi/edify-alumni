"use client";

import { useParams, useRouter } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useState } from "react";
import { RegisterForm } from "./register-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const { locale } = useParams();
  const { formType } = useAppStore();
  const [mounted, setMounted] = useState(false);

  const onClick = () => {
    router.push(locale === "en" ? `/auth/login` : `/${locale}/auth/login`);
  };

  //  useEffect(() => {
  //    setMounted(true);
  //  }, []);

  //  if (!mounted) {
  //    return null;
  //  }

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0  w-max  flex items-center justify-center bg-transparent border-none !z-[10000000] max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl">
          {formType === "login" ? <LoginForm /> : <RegisterForm />}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
