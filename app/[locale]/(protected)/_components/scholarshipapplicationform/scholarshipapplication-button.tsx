"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScholarshipApplicationForm } from "./scholarshipapplication-form";

interface ScholarshipApplicationButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const ScholarshipApplicationButton = ({
  asChild,
  children,
}: ScholarshipApplicationButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0  w-max  flex items-center justify-center bg-transparent border-none max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl">
        <ScholarshipApplicationForm />
      </DialogContent>
    </Dialog>
  );
};
