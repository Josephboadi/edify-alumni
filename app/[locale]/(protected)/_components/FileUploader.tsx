"use client";

// import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { convertFileToUrl } from "@/lib/utils";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
// import { FileWithPath } from './../../../../node_modules/file-selector/dist/file.d';

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string | undefined;
  setFiles: Dispatch<SetStateAction<File[]>>;
  isError: boolean;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  isError,
}: FileUploaderProps) {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log(convertFileToUrl(acceptedFiles[0]));
    // console.log(acceptedFiles[0]);
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
    setFileName(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf"
      ? generateClientDropzoneAccept(["application/pdf"])
      : undefined,
  });

  const handleUpload = (data: any) => {
    console.log(data);

    onFieldChange(data.info.secure_url);
    setFileName(data.info.original_filename);
    setFileExtension(data.info.format);
  };

  return (
    <div {...getRootProps()} className="w-full h-[180px]">
      <input {...getInputProps()} className="cursor-pointer" />
      {imageUrl ? (
        <div className="flex flex-col py-3 !pt-4 !px-1 h-full w-full justify-center items-center relative bg-[var(--clr-silver-v6)] rounded-[6px] shadow-md">
          {/* <Image
            src={imageUrl}
            alt="image"
            fill
            className="w-full object-cover object-center"
          /> */}
          <BsFileEarmarkPdf className="text-5xl text-red-500" />
          <p className=" mb-2 mt-2 text-center text-xs text-[var(--clr-secondary)] text-wrap">
            {/* {fileName.slice(0, 15)}
            {fileName.length > 15 && "..."}.{fileExtension} */}
            {fileName}
          </p>
          {/* <div className="mt-3 absolute left-0 right-0 top-0 flex items-center justify-center">
            <CldUploadButton
              options={{ multiple: true }}
              onSuccess={handleUpload}
              // onUploadAdded={handleUpload}
              uploadPreset="izysvi9w"
            >
              <div className="flex px-2 py-2 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground  h-full w-full rounded-[6px] border-[1px] border-[var(--clr-secondary)] text-[var(--clr-secondary)] text-sm font-semibold items-center justify-center">
                <p className="text-xs font-normal text-center text-[var(--clr-secondary)]">
                  Select from computer
                </p>
              </div>
            </CldUploadButton>
          </div> */}
        </div>
      ) : (
        <div
          className={` relative flex item-center justify-center flex-col py-3 !pt-4  text-[var(--clr-secondary)] h-full w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-md ${
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
          <h3 className=" mt-2 text-center text-sm text-[var(--clr-secondary)]">
            Choose file or drag and drop
          </h3>

          <p className="p-medium-12 mt-2 mb-4 text-center text-sm text-[var(--clr-secondary)]">
            Pdf (4MB)
          </p>
          {/* <Button type="button" className="rounded-full">
            Select from computer
          </Button> */}
          {/* <div className="mt-3 absolute left-0 right-0 top-0 flex items-center justify-center">
            <CldUploadButton
              options={{ multiple: true }}
              onSuccess={handleUpload}
              // onUploadAdded={handleUpload}
              uploadPreset="izysvi9w"
            >
              <div className="flex px-2 py-2 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground  h-full w-full rounded-[6px] border-[1px] border-[var(--clr-secondary)] text-[var(--clr-secondary)] text-sm font-semibold  items-center justify-center">
                <p className="text-xs font-normal text-center text-[var(--clr-secondary)]">
                  Select from computer
                </p>
              </div>
            </CldUploadButton>
          </div> */}
        </div>
      )}
    </div>
  );
}
