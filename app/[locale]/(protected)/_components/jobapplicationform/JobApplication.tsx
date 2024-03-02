"use client";

import { useParams, useRouter } from "next/navigation";
import { createPortal } from "react-dom";

// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useEffect, useRef } from "react";
import { JobApplicationForm } from "./jobapplication-form";

// interface JobApplicationButtonProps {
//   children: React.ReactNode;
//   asChild?: boolean;
// }

export const JobApplication = () => {
  const router = useRouter();
  const { locale, id } = useParams();
  const { setOpen } = useAppStore();

  // const [open, setOpen] = useState<boolean>(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  // const selectMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setOpen();
        router.push(locale === "en" ? `/job/${id}` : `/${locale}/job/${id}`);
        router.refresh()
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onClick = () => {
    router.push(
      locale === "en" ? `/jobapplication` : `/${locale}/jobapplication`
    );
  };

  const handleOpenForm = () => {
    // await setJobInfoData(jobInfoData);
    setOpen();
    return;
  };
  // return (
  //   <Dialog>
  //     <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
  //     <DialogContent className="p-0  w-max  flex items-center justify-center bg-transparent border-none max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl">
  //       <JobApplicationForm />
  //     </DialogContent>
  //   </Dialog>
  // );
  return (
    // <div onClick={() => handleOpenForm()}>
    // {

    createPortal(
      <div
        className={`fixed h-[100vh] min-h-[100vh] max-h-[100vh] left-0 right-0 bottom-0 top-0 bg-[rgba(0,0,0,.6)] flex items-center justify-center z-[100] `}
      >
        <div
          ref={contextMenuRef}
          className="p-0  w-max  flex items-center justify-center bg-transparent border-none max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl"
        >
          <JobApplicationForm />
        </div>
      </div>,
      document.body
    )

    //       : (
    // <div className="mb-3 md:mr-8">
    //   <div className="flex items-center justify-center  !rounded-[6px]  bg-[var(--clr-green)] hover:shadow-lg w-[90px] h-8 cursor-pointer">
    //     <p className="text-sm font-medium text-[var(--clr-primary)]">
    //       Apply
    //     </p>
    //   </div>
    // </div>
    // )
    // }
    // </div>
  );

  // <span onClick={onClick} className="cursor-pointer">
  //   {children}
  // </span>
};
