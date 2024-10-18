import Booking from "@/app/components/booking/Booking";
import Header from "@/app/components/common/header";
import ListBox from "@/app/components/common/headlessui/ListBox";
import Input from "@/app/components/common/input/Input";

const items = ["All", "Finished", "Upcomming"];

const index = () => {
  return (
    <Header>
      <div className="flex items-center gap-x-5 w-full sm:w-8/12 lg:w-5/12 ml-auto">
        <ListBox items={items} />
        <Input placeholder={"Search"} />
      </div>
      <Booking />
    </Header>
  );
};

export default index;
