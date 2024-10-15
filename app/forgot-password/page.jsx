import Button from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import LoginImage from "@/public/images/login.png";
import Image from "next/image";
import Link from "next/link";

const page = () => {
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
            <Input
              placeholder={"Email*"}
              name={"email"}
              className="bg-white/90 focus:border-gray-500"
            />
            <Button title="Send reset link" icon />
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

export default page;
