"use client";

import { credentialLogin, socialLogin } from "@/app/actions";
import Button from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import GoogleIcon from "@/public/icons/google.png";
import LoginImage from "@/public/images/login.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });

  const changeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async () => {
    try {
      const response = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.status === 200) {
        await credentialLogin(user);
      } else {
        setUserError(await response.json());
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="flex items-center">
      <div className="bg-slate-800 w-6/12 h-screen hidden md:flex items-center justify-center">
        <Image src={LoginImage} alt="" className="w-6/12" />
      </div>
      <div className="w-full md:w-6/12 flex justify-center h-screen items-center text-center">
        <div className="w-full px-5 lg:w-6/12">
          <p className="text-primary text-4xl font-semibold">Welcome!</p>
          <p className="text-3xl font-medium mt-2">
            It’s really nice to see you
          </p>
          <div className="mt-5 space-y-5">
            <div>
              <Input
                placeholder={"Name*"}
                name={"name"}
                className="bg-white/90 focus:border-gray-500"
                changeHandler={changeHandler}
              />
              {userError.name && (
                <p className="text-red-400 text-left">{userError.name}</p>
              )}
            </div>
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
            <div>
              <Input
                type="password"
                placeholder={"Password*"}
                name="password"
                className="bg-white/90 focus:border-gray-500"
                changeHandler={changeHandler}
              />
              {userError.password && (
                <p className="text-red-400 text-left">{userError.password}</p>
              )}
            </div>
            <div className="flex justify-between gap-2">
              <Link
                className="text-primary font-semibold hover:underline"
                href={"/login"}
              >
                I already have an account
              </Link>
              <Link className="text-gray-500" href={"/forgot-password"}>
                forgot password?
              </Link>
            </div>
            <Button title={"SignUp"} icon onClick={submitHandler} />
            <div className="flex items-center gap-x-2">
              <p className="border w-full" />
              <p className="font-semibold">OR</p>
              <p className="border w-full" />
            </div>
            <div
              className="flex items-center justify-center gap-x-5 border py-1.5 px-5 rounded transition font-medium hover:shadow-sm w-full cursor-pointer"
              onClick={() => socialLogin("google")}
            >
              <Image src={GoogleIcon} alt="" className="size-5" />
              <button className="">Login with google</button>
            </div>
            {userError.message && (
              <p className="text-red-400 text-center">{userError.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
