"use client";

// import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaTrashAlt } from "react-icons/fa";
// import { FileWithPath } from './../../../../node_modules/file-selector/dist/file.d';

type FileUploaderProps = {
  onFieldChange: ([]: string[]) => void;
  imageUrls: string[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  isError: boolean;
};

export function ImageUploader({
  imageUrls,
  onFieldChange,
  setFiles,
  isError,
}: FileUploaderProps) {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  let newImages = [...imageUrls];
  let newRawImages: any = [];
  let newBothImages: any = [];

  useEffect(() => {
    if (imageUrls.length > 0) {
      imageUrls.map((imageUrl) => {
        newBothImages.push({ img: imageUrl, raw: undefined });
      });
    }
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log(convertFileToUrl(acceptedFiles[0]));
    // console.log(acceptedFiles[0]);

    if (acceptedFiles.length > 0) {
      acceptedFiles.map((file) => {
        newRawImages.push(file);
        newImages.push(convertFileToUrl(file));
        newBothImages.push({ img: convertFileToUrl(file), raw: file });
      });
      onFieldChange(newImages);
      setFiles(newRawImages);
      // setFileName()
    }
    // onFieldChange(convertFileToUrl(acceptedFiles[0]));
    // setFileName(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxFiles: 10,
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  // const handleUpload = (data: any) => {
  //   console.log(data);

  //   onFieldChange(data.info.secure_url);
  //   setFileName(data.info.original_filename);
  //   setFileExtension(data.info.format);
  // };

  const handleRemoveImage = async (fileUrl: string) => {
    const newbothImagess = await newBothImages.filter(
      (image: any) => image.img !== fileUrl
    );
    let newImagess: any = [];
    let newRawImagess: any = [];

    if (newbothImagess.length > 0) {
      await newbothImagess.map((image: any) => {
        newImagess.push(image.img);
        if (image.raw) {
          newRawImagess.push(image.raw);
        }
      });

      onFieldChange(newImagess);
      setFiles(newRawImagess);
    }
  };

  return (
    <>
      <div {...getRootProps()} className="w-full h-[250px]">
        <input {...getInputProps()} className="cursor-pointer" />

        <div
          className={` relative flex item-center justify-center flex-col py-3 !pt-4  text-[var(--clr-secondary)] h-full w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-none ${
            isError
              ? "border border-red-500 focus-visible:ring-0"
              : "focus-visible:ring-transparent border-none"
          }`}
        >
          <div className="w-full flex justify-center">
            <Image
              src="/assets/upload.svg"
              width={60}
              height={60}
              alt="file upload"
            />
          </div>
          <h3 className=" mt-2 text-center text-sm text-[var(--clr-secondary)]">
            Choose files or drag and drop
          </h3>

          <p className="p-medium-12 mt-2 mb-4 text-center text-sm text-[var(--clr-secondary)]">
            SVG, PNG, JPG (4MB)
          </p>
        </div>
        {imageUrls.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 ">
            {imageUrls.map((imageUrl) => (
              <div
                key={imageUrl}
                className="flex w-full items-center h-[100px] rounded-[8px]"
              >
                <div className="flex flex-grow  w-full h-[100px] justify-center items-center">
                  <Image
                    src={imageUrl}
                    alt="image"
                    // width={250}
                    // height={250}
                    fill
                    className=" object-cover object-center "
                  />
                </div>
                <div
                  onClick={() => handleRemoveImage(imageUrl)}
                  className="w-[50px] h-full bg-red-600 flex items-center justify-center cursor-pointer"
                >
                  <FaTrashAlt className="text-white" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-10">
            <p>No Image Selected</p>
          </div>
        )}
      </div>
    </>
  );
}
