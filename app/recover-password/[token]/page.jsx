"use client";

import { credentialLogin } from "@/app/actions";
import Button from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import { recoverPasswordValidation } from "@/app/lib/validations/auth";
import LoginImage from "@/public/images/login.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const RecoverPage = () => {
  const [user, setUser] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [userError, setUserError] = useState({
    newPassword: "",
    confirmPassword: "",
    message: "",
  });

  const [isClicked, setIsClicked] = useState(false);

  const params = useParams();

  const changeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    setUserError({
      ...userError,
      [event.target.name]: "",
    });
  };

  const submitHandler = async () => {
    if (user.newPassword === user.confirmPassword) {
      setIsClicked(true);
      setUserError({
        newPassword: "",
        confirmPassword: "",
        message: "",
      });
      try {
        await recoverPasswordValidation.parse(user);
        const response = await fetch(`/api/recoverPassword`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            ...params,
          }),
        });
        setIsClicked(false);
        const result = await response.json();
        if (response.status === 200) {
          credentialLogin(result);
        } else {
          setUserError(result);
        }
      } catch (errors) {
        setIsClicked(false);
        const formattedErrors = errors.issues.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setUserError(formattedErrors);
      }
    } else {
      setUserError({
        message: "New password and confirm password do not match!",
      });
    }
  };

  return (
    <div className="flex items-center">
      <div className="bg-slate-800 w-6/12 h-screen hidden md:flex items-center justify-center">
        <Image src={LoginImage} alt="" className="w-6/12" />
      </div>
      <div className="w-full md:w-6/12 flex justify-center h-screen items-center text-center">
        <div className="w-full px-5 lg:w-6/12">
          <p className="text-primary text-4xl font-semibold">Dont worry!</p>
          <p className="text-3xl font-medium mt-2">
            You are just one click away!
          </p>
          <div className="mt-5 space-y-5">
            <div>
              <Input
                type="password"
                placeholder={"New Password*"}
                name="newPassword"
                className="bg-white/90 focus:border-gray-500"
                changeHandler={changeHandler}
              />
              {userError.newPassword && (
                <p className="text-red-400 text-left">
                  {userError.newPassword}
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder={"Confirm Password*"}
                name="confirmPassword"
                className="bg-white/90 focus:border-gray-500"
                changeHandler={changeHandler}
              />
              {userError.confirmPassword && (
                <p className="text-red-400 text-left">
                  {userError.confirmPassword}
                </p>
              )}
            </div>
            <Button
              title={"Submit"}
              icon
              onClick={submitHandler}
              isClicked={isClicked}
            />
            {userError.message && (
              <p className="text-red-400 text-center">{userError.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPage;
