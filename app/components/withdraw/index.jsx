"use client";

import Lists from "@/app/components/withdraw/Lists";
import Button1 from "../common/button/Button";

const tutors = [
  {
    _id: 1,
    date: "10-10-2023",
    isPaid: false,
    withdrawMoney: 256,
  },
  {
    _id: 2,
    date: "10-10-2023",
    isPaid: true,
    withdrawMoney: 156,
  },
  {
    _id: 3,
    date: "10-10-2023",
    isPaid: true,
    withdrawMoney: 156,
  },
];

const Withdraw = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap sm:flex-nowrap gap-5 flex-col-reverse sm:flex-row gap-x-5">
        <p className="text-2xl text-nowrap w-full">{tutors.length} requests</p>
        <div className="bg-white p-5 shadow-sm w-full sm:w-6/12 md:w-4/12">
          <p>Available for withdraw</p>
          <p className="text-2xl mt-2">$290</p>
          <Button1 title={"Withdraw"} className={"mt-5"} />
        </div>
      </div>
      <Lists tutors={tutors} />
    </div>
  );
};

export default Withdraw;
