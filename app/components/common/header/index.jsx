"use client";

import AvatarPhoto from "@/app/components/common/header/Avatar";
import DropDown from "@/app/components/common/headlessui/Dropdown";
import Sidebar from "@/app/components/common/sidebar";
import { getMyAccount } from "@/app/lib/store/features/myAccountSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/hook";
import { LogOut, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const profileMenus = [
  {
    id: 2,
    icon: <Settings className="size-5" />,
    name: "My Account",
    href: "/my-account",
  },
  {
    id: 3,
    icon: <LogOut className="size-5" />,
    name: "Logout",
    href: "/login",
  },
];

const Index = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((store) => store.myAccount);

  useEffect(() => {
    dispatch(getMyAccount());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} />
      <div className="px-0 sm:px-10 mx-auto container sm:mt-2">
        <div className="bg-white px-5 rounded shadow sticky top-0 z-10">
          <div className="flex items-center justify-between h-14">
            <Link
              href={"/"}
              className={`font-bold text-lg md:text-xl xl:text-2xl textGradient flex items-center font-montserrat h-14 sm:hidden`}
            >
              Tim tutor
            </Link>
            <Menu
              className="size-7 lg:size-9 cursor-pointer hidden sm:block hover:bg-slate-100 p-1 rounded-full transition"
              onClick={() => setIsOpen(!isOpen)}
            />
            <div className="flex items-center gap-5">
              <DropDown
                btnIcon={<AvatarPhoto data={data} />}
                items={profileMenus}
                data={data}
              />
              <div>
                <p className="text-sm">Balance</p>
                <p className="text-green-600 text-end font-semibold">
                  ${data?.balance}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-24 sm:my-10 px-5 sm:px-0">{children}</div>
      </div>
    </div>
  );
};

export default Index;
