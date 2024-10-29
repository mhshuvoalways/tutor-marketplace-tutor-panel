"use client";

import Booking from "@/app/components/booking/Booking";
import Header from "@/app/components/common/header";
import Input from "@/app/components/common/input/Input";
import { useEffect, useState } from "react";

const Index = () => {
  const [booking, setBooking] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchBooking() {
      if (!booking.length) {
        const response = await fetch("/api/booking", { method: "GET" });
        setBooking(await response.json());
      }
    }
    fetchBooking();
  }, [booking.length]);

  const filteredArray = booking.filter((el) =>
    el?.student.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Header>
      <div className="flex items-center gap-x-5 w-full sm:w-6/12 lg:w-4/12 ml-auto">
        <Input
          placeholder={"Search"}
          changeHandler={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <Booking booking={filteredArray} />
    </Header>
  );
};

export default Index;
