import LoadingIcon from "@/public/icons/loading.svg";
import { MoveRight } from "lucide-react";
import Image from "next/image";

const Button1 = ({ title, className, onClick, icon, isClicked, isDisable }) => {
  return (
    <button
      className={`flex items-center justify-center gap-x-2 btn py-2 px-5 text-base bg-primary/90 hover:bg-primary text-white w-full font-semibold rounded ${className}`}
      onClick={onClick}
      disabled={isClicked || isDisable}
    >
      {title}
      {isClicked ? (
        <Image src={LoadingIcon} alt="loading icon" />
      ) : (
        icon && <MoveRight />
      )}
    </button>
  );
};

export default Button1;
