"use client";

import Loading from "@/public/icons/spinner.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = ({ searchParams }) => {
  const router = useRouter();

  useEffect(() => {
    async function getFunction() {
      const response = await fetch(`/api/stripe/redirect`, {
        method: "POST",
        body: JSON.stringify({ code: searchParams.code }),
      });
      if (response.status === 200) {
        router.push("/manage-money?success");
      } else {
        router.push("/manage-money?error");
      }
    }
    getFunction();
  }, [router, searchParams.code]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={Loading} alt="" className="w-56" />
    </div>
  );
};

export default Page;
