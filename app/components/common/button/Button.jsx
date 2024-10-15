import { MoveRight } from "lucide-react";

const Button1 = ({ title, className, onClick, icon }) => {
  return (
    <button
      className={`flex items-center justify-center gap-x-2 btn py-2 px-5 text-base bg-primary/90 hover:bg-primary text-white w-full font-semibold rounded ${className}`}
      onClick={onClick}
    >
      {title}
      {icon && <MoveRight />}
    </button>
  );
};

export default Button1;
