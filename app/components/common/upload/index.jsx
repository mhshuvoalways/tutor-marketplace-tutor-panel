"use client";

import ArrowUpload from "@/public/icons/upload.svg";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";

const UploadImage = ({ imageHandler }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (acceptedFiles) => {
    setIsDragging(false);
    imageHandler(acceptedFiles);
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      multiple={false}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={`bg-yellow-50 shadow rounded-lg h-40 border-dashed border-2 border-secondary flex items-center justify-center cursor-pointer`}
        >
          <div>
            <Image
              className={`size-16 text-white mx-auto transition ${
                isDragging ? "transform scale-125" : ""
              }`}
              src={ArrowUpload}
              alt=""
            />
            <p
              className={`text2 text-center transition ${
                isDragging ? "transform scale-150" : ""
              }`}
            >
              {isDragging ? "Drop it!" : "Click or Drag & Drop"}
            </p>
            <input {...getInputProps()} />
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default UploadImage;
