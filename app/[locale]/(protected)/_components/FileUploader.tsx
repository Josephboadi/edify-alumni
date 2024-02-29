'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
}

export function FileUploader({ imageUrl, onFieldChange }: FileUploaderProps) {
//   const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
//     setFiles(acceptedFiles)
//     onFieldChange(convertFileToUrl(acceptedFiles[0]))
//   }, [])

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
//   })

  return (
    <div
      //   {...getRootProps()}
      className="w-full h-[200]"
    >
     
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center relative bg-[var(--clr-silver-v6)] rounded-[10px]">
          <Image
            src={imageUrl}
            alt="image"
            fill
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex item-center justify-center flex-col py-5 px-2 text-grey-500 h-full w-full bg-[var(--clr-silver-v6)] rounded-[10px] shadow-sm">
          <div className="w-full flex justify-center">
            <img
            src="/assets/upload.svg"
            width={70}
            height={70}
            alt="file upload"
          />
          </div>
          <h3 className="mb-2 mt-2 text-center">Accepted File</h3>
          <p className="p-medium-12 mb-4 text-center">Pdf</p>
          <Button
            variant={"outline"}
            className="flex px-5  h-full w-full rounded-[6px] border-[var(--clr-secondary)] text-[var(--clr-secondary)] text-sm font-semibold bg-transparent items-center justify-center"
          >
            <p className='text-xs font-normal text-center'>Select from computer</p>
          </Button>
        </div>
      )}
    </div>
  );
}
