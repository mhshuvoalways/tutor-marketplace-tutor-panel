import TutorImage from "@/public/images/tutor.jpg";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

const Dropdown = ({ btnIcon, items }) => {
  const logoutHandler = () => {
    localStorage.clear();
  };

  return (
    <Menu>
      <MenuButton>{btnIcon}</MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className={`z-20 bg-white shadow rounded p-2 mt-3`}
        >
          <div className="flex items-center gap-x-5 p-2 border-b">
            <Image src={TutorImage} alt="" className="size-10 rounded-full" />
            <div>
              <p className="text-lg">MH Shuvo</p>
              <div className="flex items-center gap-2">
                <p className="opacity-80 text-sm font-medium break-all">
                  mhshuvoalways@gmail.com
                </p>
              </div>
            </div>
          </div>
          {items.map((item) => {
            return (
              <div key={item.id}>
                <MenuItem>
                  {item.name === "Logout" ? (
                    <p
                      onClick={logoutHandler}
                      className="cursor-pointer flex items-center gap-3 hover:text-primary transition p-2"
                    >
                      {item.icon}
                      {item.name}
                    </p>
                  ) : (
                    <Link
                      href={item.href}
                      className={`cursor-pointer flex items-center gap-3 hover:text-primary transition p-2 border-b`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  )}
                </MenuItem>
              </div>
            );
          })}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
