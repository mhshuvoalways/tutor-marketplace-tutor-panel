"use client";

import Lists from "@/app/components/withdraw/Lists";
import { useAppSelector } from "@/app/lib/store/hook";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button1 from "../common/button/Button";

const Withdraw = () => {
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawError, setWithdrawError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [allwithdraws, setAllWithdraws] = useState([]);

  const { data } = useAppSelector((store) => store.myAccount);

  async function withDraw() {
    const temp = [...allwithdraws];
    setIsClicked(true);
    setWithdrawSuccess("");
    setWithdrawError("");
    const response = await fetch("/api/withdraw", { method: "POST" });
    const result = await response.json();
    setIsClicked(false);
    if (response.status === 200) {
      temp.push(result.response);
      setAllWithdraws(temp);
      setWithdrawSuccess(result.message);
    } else {
      setWithdrawError(result.message);
    }
  }

  useEffect(() => {
    async function fetchWithdraws() {
      const response = await fetch("/api/withdraw", { method: "GET" });
      const result = await response.json();
      if (response.status === 200) {
        setAllWithdraws(result);
      }
    }
    fetchWithdraws();
  }, []);

  const connectStripeAccount = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID}&scope=read_write`;

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap sm:flex-nowrap gap-5 flex-col-reverse sm:flex-row gap-x-5">
        <p className="text-2xl text-nowrap w-full">
          {allwithdraws.length} withdraws
        </p>
        <div className="bg-white p-5 shadow-sm w-full">
          {data?.tutorStripeAccountId ? (
            <div className="flex items-center gap-2">
              <p>Your Stripe account is connected</p>
              <p>✅</p>
            </div>
          ) : (
            <p>Connect your Stripe account to withdraw</p>
          )}
          <Link href={connectStripeAccount}>
            <Button1
              title={data?.tutorStripeAccountId ? "Reconnect" : "Connect"}
              className={`mt-5 ${
                data?.tutorStripeAccountId ? "!bg-green-500" : ""
              }`}
              icon={data?.tutorStripeAccountId ? false : true}
              isDisable={isClicked}
            />
          </Link>
        </div>
        <div className="bg-white p-5 shadow-sm w-full">
          <p>Available for withdraw</p>
          <p className="text-2xl mt-2">${data?.balance}</p>
          <Button1
            title={"Withdraw"}
            className={`mt-5 ${data?.balance > 0 ? "" : "cursor-not-allowed"}`}
            icon={true}
            isDisable={data?.balance > 0 ? false : true}
            onClick={withDraw}
            isClicked={isClicked}
          />
          {withdrawSuccess && (
            <p className="text-green-400 text-center mt-2">{withdrawSuccess}</p>
          )}
          {withdrawError && (
            <p className="text-red-400 text-center mt-2">{withdrawError}</p>
          )}
        </div>
      </div>
      <Lists allwithdraws={allwithdraws} />
    </div>
  );
};

export default Withdraw;
