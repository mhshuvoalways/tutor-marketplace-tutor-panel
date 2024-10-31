"use client";

import Loading from "@/public/icons/spinner.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VerifyAccount = ({ searchParams }) => {
  const router = useRouter();

  useEffect(() => {
    async function postVerify() {
      const response = await fetch("/api/auth/verifyEmail", {
        method: "POST",
        body: JSON.stringify({ token: searchParams.token }),
      });
      await response.json();
      if (response.status === 200) {
        router.push("/login");
      }
    }
    postVerify();
  }, [router, searchParams.token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={Loading} alt="" className="w-56" />
    </div>
  );
};

export default VerifyAccount;
