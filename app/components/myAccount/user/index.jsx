"use client";

import Button1 from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import UploadImage from "@/app/components/common/upload";
import { useAppSelector } from "@/app/lib/store/hook";
import { passwordChangeSchema } from "@/app/lib/validations/auth";
import Image from "next/image";
import { useState } from "react";

const Index = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changeSuccessAvatar, setChangeSuccessAvatar] = useState("");
  const [changeSuccess, setChangeSuccess] = useState("");

  const [userError, setUserError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    message: "",
  });

  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const [isClickedAvatar, setIsClickedAvatar] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { data } = useAppSelector((store) => store.myAccount);

  const changeHandler = async (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
    setUserError({
      ...userError,
      [event.target.name]: "",
    });
  };

  const submitHandler = async () => {
    setIsClicked(true);
    setUserError({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      message: "",
    });
    setChangeSuccess("");
    try {
      passwordChangeSchema.parse(password);
      if (password.confirmPassword === password.newPassword) {
        const response = await fetch(`/api/auth`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(password),
        });
        setIsClicked(false);
        if (response.status === 200) {
          const message = await response.json();
          setChangeSuccess(message.message);
          setPassword({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setUserError(await response.json());
        }
      } else {
        setIsClicked(false);
        setUserError({
          ...userError,
          message: "New password and confirm password don't match!",
        });
      }
    } catch (errors) {
      setIsClicked(false);
      const formattedErrors = errors?.issues?.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setUserError(formattedErrors);
    }
  };

  const imageHandler = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setChangeSuccessAvatar("");
    setImageError("");
  };

  const changeAvatar = async () => {
    setIsClickedAvatar(true);
    setChangeSuccessAvatar("");
    setImageError("");
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "tutor-marketplace");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/mhshuvoalways/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        const result = await fetch(`/api/myAccount`, {
          method: "PUT",
          body: JSON.stringify({
            public_id: data.public_id,
            url: data.url,
          }),
        });
        if (result.status === 200) {
          setChangeSuccessAvatar("Updated!");
        } else {
          setImageError("Server error occurred!");
        }
      } else {
        setImageError("Server error occurred!");
      }
    } else {
      setImageError("Upload an image!");
    }
    setIsClickedAvatar(false);
  };

  let src = "";
  if (image) {
    src = URL.createObjectURL(image);
  } else if (data?.avatar?.url) {
    src = data?.avatar?.url;
  }

  return (
    <div className="bg-white rounded shadow-sm p-5">
      <p className="text-2xl">Account</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-end mt-10">
        <div className="space-y-5">
          <div className="flex items-center gap-5 text-nowrap">
            {src ? (
              <Image
                src={src}
                alt=""
                className="w-20 lg:size-40 rounded-full"
                width={400}
                height={400}
              />
            ) : (
              <p
                className={`rounded-full bg-primary text-white flex items-center justify-center size-20 lg:size-40 text-2xl lg:text-7xl`}
              >
                {data?.name?.split("")[0]}
              </p>
            )}
            <div>
              <p className="text-2xl">{data?.name}</p>
              <p className="text-gray-500">Max file size is 2 MB</p>
            </div>
          </div>
          <UploadImage imageHandler={imageHandler} />
          <Button1
            title={"Save"}
            onClick={changeAvatar}
            isClicked={isClickedAvatar}
          />
          {imageError && (
            <p className="text-red-400 text-center">{imageError}</p>
          )}
          {changeSuccessAvatar && (
            <p className="text-green-400 text-center">{changeSuccessAvatar}</p>
          )}
        </div>
        <div className="space-y-5">
          <p className="text-xl">User Password</p>
          <div>
            <Input
              placeholder="Current password"
              name={"currentPassword"}
              changeHandler={changeHandler}
              value={password.currentPassword}
            />
            {userError.currentPassword && (
              <p className="text-red-400 text-left">
                {userError.currentPassword}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="New password"
              name={"newPassword"}
              changeHandler={changeHandler}
              value={password.newPassword}
            />
            {userError.newPassword && (
              <p className="text-red-400 text-left">{userError.newPassword}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Confirm password"
              name={"confirmPassword"}
              changeHandler={changeHandler}
              value={password.confirmPassword}
            />
            {userError.confirmPassword && (
              <p className="text-red-400 text-left">
                {userError.confirmPassword}
              </p>
            )}
          </div>
          <Button1
            title={"Change"}
            onClick={submitHandler}
            isClicked={isClicked}
          />
          {userError.message && (
            <p className="text-red-400 text-center">{userError.message}</p>
          )}
          {changeSuccess && (
            <p className="text-green-400 text-center">{changeSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
