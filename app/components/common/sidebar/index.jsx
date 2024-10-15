import LogoImage from "@/public/images/logo.png";
import { Calendar, Home, LogOut, Settings, BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    id: 1,
    icon: Home,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    icon: Calendar,
    name: "Availability",
    href: "/availability",
  },
  {
    id: 4,
    icon: BadgeDollarSign,
    name: "Withdraw req.",
    href: "/withdraw-requests",
  },
  {
    id: 4,
    icon: Settings,
    name: "My Account",
    href: "/my-account",
  },
  {
    id: 3,
    icon: LogOut,
    name: "Logout",
    href: "/login",
  },
];

const Index = ({ isOpen }) => {
  const pathname = usePathname();

  return (
    <div
      className={`bg-white sm:h-screen transition-all duration-300 shadow fixed sm:sticky bottom-0 sm:top-0 py-2 sm:py-0 z-10 w-full ${
        isOpen ? "translate-x-0 sm:w-56 overflow-y-auto" : "sm:w-20"
      }`}
    >
      <div>
        <Link
          href={"/"}
          className={`font-bold text-xl xl:text-2xl textGradient py-5 font-montserrat h-14 hidden sm:block px-5`}
        >
          {isOpen && <Image src={LogoImage} alt="" />}
        </Link>
        <div className="sm:mt-12 px-5 sm:space-y-5 flex sm:block items-center justify-between">
          {menus.map((menu) => {
            const isActive =
              menu.href === "/"
                ? pathname === menu.href
                : pathname.includes(menu.href);
            return (
              <Link
                href={menu.href}
                className={`flex items-center gap-2 p-2 h-9 hover:text-primary ${
                  isActive && "text-primary"
                } ${!isOpen && "justify-center size-9"}`}
                key={menu.id}
              >
                {<menu.icon className="size-5" />}
                {isOpen && (
                  <p className="cursor-pointer overflow-x-hidden font-medium hidden sm:block">
                    {menu.name}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
