"use client";

import Button from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import { forgotPasswordValidation } from "@/app/lib/validations/auth";
import LoginImage from "@/public/images/login.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const [userError, setUserError] = useState({
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState({
    message: "",
  });

  const changeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    setUserError({
      ...user,
      [event.target.name]: "",
    });
  };

  const [isClicked, setIsClicked] = useState(false);

  const submitHandler = async () => {
    setIsClicked(true);
    try {
      await forgotPasswordValidation.parseAsync(user);
      const response = await fetch(`/api/forgotPassword`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      setIsClicked(false);
      if (response.status === 200) {
        setSuccess(await response.json());
      } else {
        setUserError(await response.json());
      }
    } catch (errors) {
      setIsClicked(false);
      const formattedErrors = errors.issues.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setUserError(formattedErrors);
    }
  };

  return (
    <div className="font-outfit flex items-center">
      <div className="bg-slate-800 w-6/12 h-screen hidden md:flex items-center justify-center">
        <Image src={LoginImage} alt="" className="w-6/12" />
      </div>
      <div className="w-full md:w-6/12 flex justify-center h-screen items-center text-center">
        <div className="w-full px-5 lg:w-6/12">
          <p className="text-primary text-4xl font-semibold">Dont worry!</p>
          <p className="text-3xl font-medium mt-2">
            We’ll send you the reset link
          </p>
          <div className="mt-5 space-y-5">
            <div>
              <Input
                placeholder={"Email*"}
                name={"email"}
                className="bg-white/90 focus:border-gray-500"
                changeHandler={changeHandler}
              />
              {userError.email && (
                <p className="text-red-400 text-left">{userError.email}</p>
              )}
            </div>
            <Button
              title="Send reset link"
              icon
              isClicked={isClicked}
              onClick={submitHandler}
            />
            {userError.message && (
              <p className="text-red-400 text-center">{userError.message}</p>
            )}
            {success.message && (
              <p className="text-green-400 text-center">{success.message}</p>
            )}
            <div className="flex items-center justify-between gap-x-2">
              <Link className="text-primary font-semibold" href={"/signup"}>
                SignUp
              </Link>
              <Link className="text-primary font-semibold" href={"/login"}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
