"use client";

import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: any;
  isError: boolean;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  isError,
}: FileUploaderProps) {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  //   const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
  //     setFiles(acceptedFiles)
  //     onFieldChange(convertFileToUrl(acceptedFiles[0]))
  //   }, [])

  //   const { getRootProps, getInputProps } = useDropzone({
  //     onDrop,
  //     accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  //   })

  const handleUpload = (data: any) => {
    // console.log(data);
    onFieldChange(data.info.secure_url);
    setFileName(data.info.original_filename);
    setFileExtension(data.info.format);
  };

  return (
    <div
      //   {...getRootProps()}
      className="w-full h-[180px]"
    >
      {imageUrl ? (
        <div className="flex flex-col py-3 !pt-14 !px-1 h-full w-full justify-center items-center relative bg-[var(--clr-silver-v6)] rounded-[6px] shadow-md">
          {/* <Image
            src={imageUrl}
            alt="image"
            fill
            className="w-full object-cover object-center"
          /> */}
          <BsFileEarmarkPdf className="text-5xl text-red-500" />
          <p className="p-medium-12 mb-2 mt-2 text-center text-xs text-[var(--clr-secondary)]">
            {fileName.slice(0, 15)}
            {fileName.length > 15 && "..."}.{fileExtension}
          </p>
          <div className="mt-3 absolute left-0 right-0 top-0 flex items-center justify-center">
            <CldUploadButton
              options={{ multiple: false }}
              onUpload={handleUpload}
              uploadPreset="izysvi9w"
            >
              <div className="flex px-2 py-2 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground  h-full w-full rounded-[6px] border-[1px] border-[var(--clr-secondary)] text-[var(--clr-secondary)] text-sm font-semibold items-center justify-center">
                <p className="text-xs font-normal text-center text-[var(--clr-secondary)]">
                  Select from computer
                </p>
              </div>
            </CldUploadButton>
          </div>
        </div>
      ) : (
        <div
          className={` relative flex item-center justify-center flex-col py-3 !pt-14  text-[var(--clr-secondary)] h-full w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-md ${
            isError
              ? "border border-red-500 focus-visible:ring-0"
              : "focus-visible:ring-transparent border-none"
          }`}
        >
          <div className="w-full flex justify-center">
            <img
              src="/assets/upload.svg"
              width={60}
              height={60}
              alt="file upload"
            />
          </div>
          <h3 className="mb-2 mt-2 text-center text-sm text-[var(--clr-secondary)]">
            Accepted File
          </h3>
          <p className="p-medium-12 mb-4 text-center text-sm text-[var(--clr-secondary)]">
            Pdf
          </p>
          <div className="mt-3 absolute left-0 right-0 top-0 flex items-center justify-center">
            <CldUploadButton
              options={{ multiple: false }}
              onUpload={handleUpload}
              uploadPreset="izysvi9w"
            >
              <div className="flex px-2 py-2 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground  h-full w-full rounded-[6px] border-[1px] border-[var(--clr-secondary)] text-[var(--clr-secondary)] text-sm font-semibold  items-center justify-center">
                <p className="text-xs font-normal text-center text-[var(--clr-secondary)]">
                  Select from computer
                </p>
              </div>
            </CldUploadButton>
          </div>
        </div>
      )}
    </div>
  );
}
