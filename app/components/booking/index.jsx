import Booking from "@/app/components/booking/Booking";
import ListBox from "@/app/components/common/headlessui/ListBox";
import Input from "@/app/components/common/input/Input";

const items = ["All", "Finished", "Upcomming"];

const index = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white rounded py-10 px-5 text-center shadow-sm">
          <p className="opacity-80">Total Booking</p>
          <p className="text-2xl mt-5">19</p>
        </div>
        <div className="bg-white rounded py-10 px-5 text-center shadow-sm">
          <p className="opacity-80">Running Booking</p>
          <p className="text-2xl mt-5">02</p>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-5 w-full sm:w-8/12 lg:w-5/12 ml-auto">
        <ListBox items={items} />
        <Input placeholder={"Search"} />
      </div>
      <Booking />
    </>
  );
};

export default index;
