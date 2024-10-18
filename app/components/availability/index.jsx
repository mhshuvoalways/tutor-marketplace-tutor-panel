"use client";

import Availability from "@/app/components/availability/Availability";
import Dialog from "@/app/components/common/headlessui/Dialog";
import ListboxComponent from "@/app/components/common/headlessui/ListBox";
import { availabilityValidation } from "@/app/lib/validations/availability";
import { useEffect, useState } from "react";

const allAvailability = [
  "12:00AM",
  "12:15AM",
  "12:30AM",
  "12:45AM",
  "1:00AM",
  "1:15AM",
  "1:30AM",
  "1:45AM",
  "2:00AM",
  "2:15AM",
  "2:30AM",
  "2:45AM",
  "3:00AM",
  "3:15AM",
  "3:30AM",
  "3:45AM",
  "4:00AM",
  "4:15AM",
  "4:30AM",
  "4:45AM",
  "5:00AM",
  "5:15AM",
  "5:30AM",
  "5:45AM",
  "6:00AM",
  "6:15AM",
  "6:30AM",
  "6:45AM",
  "7:00AM",
  "7:15AM",
  "7:30AM",
  "7:45AM",
  "8:00AM",
  "8:15AM",
  "8:30AM",
  "8:45AM",
  "9:00AM",
  "9:15AM",
  "9:30AM",
  "9:45AM",
  "10:00AM",
  "10:15AM",
  "10:30AM",
  "10:45AM",
  "11:00AM",
  "11:15AM",
  "11:30AM",
  "11:45AM",
  "12:00PM",
  "12:15PM",
  "12:30PM",
  "12:45PM",
  "1:00PM",
  "1:15PM",
  "1:30PM",
  "1:45PM",
  "2:00PM",
  "2:15PM",
  "2:30PM",
  "2:45PM",
  "3:00PM",
  "3:15PM",
  "3:30PM",
  "3:45PM",
  "4:00PM",
  "4:15PM",
  "4:30PM",
  "4:45PM",
  "5:00PM",
  "5:15PM",
  "5:30PM",
  "5:45PM",
  "6:00PM",
  "6:15PM",
  "6:30PM",
  "6:45PM",
  "7:00PM",
  "7:15PM",
  "7:30PM",
  "7:45PM",
  "8:00PM",
  "8:15PM",
  "8:30PM",
  "8:45PM",
  "9:00PM",
  "9:15PM",
  "9:30PM",
  "9:45PM",
  "10:00PM",
  "10:15PM",
  "10:30PM",
  "10:45PM",
  "11:00PM",
  "11:15PM",
  "11:30PM",
  "11:45PM",
];

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailablility] = useState({
    day: "",
    startedTime: allAvailability[0],
    endedTime: allAvailability[0],
    timeZone: "",
  });

  const [availabilityError, setAvailablilityError] = useState({
    startedTime: "",
    endedTime: "",
    message: "",
  });

  const [avail, setAvail] = useState([]);

  const [isClicked, setIsClicked] = useState(false);

  const availabilityDayHandler = (day) => {
    setAvailablility({
      day: day,
      startedTime: allAvailability[0],
      endedTime: allAvailability[0],
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    setAvailablilityError({
      startedTime: "",
      endedTime: "",
      message: "",
    });
  };

  const availabilityHandler = (time, item) => {
    setAvailablility((prevAvailability) => ({
      ...prevAvailability,
      [time]: item,
    }));
    setAvailablilityError({
      ...availabilityError,
      [time]: "",
    });
  };

  const onSubmitHandler = async () => {
    setIsClicked(true);
    try {
      availabilityValidation.parse(availability);
      const response = await fetch("/api/availability", {
        method: "POST",
        body: JSON.stringify(availability),
      });
      setIsClicked(false);
      const result = await response.json();
      if (response.status === 200) {
        setIsOpen(false);
        fetchAvailability();
      } else {
        setAvailablilityError(result);
      }
    } catch (errors) {
      setIsClicked(false);
      const formattedErrors = errors?.issues?.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setAvailablilityError(formattedErrors);
    }
  };

  async function fetchAvailability() {
    const response = await fetch("/api/availability", {
      method: "GET",
    });
    const data = await response.json();
    if (response.status === 200) {
      const allDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const result = allDays.map((day) => ({
        day,
        time: [],
      }));
      data.forEach((item) => {
        const { _id, day, startedTime, endedTime } = item;
        const dayObj = result.find((d) => d.day === day);
        dayObj.time.push({ _id, startedTime, endedTime });
      });
      setAvail(result);
    }
  }

  useEffect(() => {
    fetchAvailability();
  }, []);

  const deleteHandler = async (id) => {
    const response = await fetch("/api/availability", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      fetchAvailability();
    }
  };

  return (
    <div>
      <Availability
        avail={avail}
        setIsOpen={setIsOpen}
        availabilityDayHandler={availabilityDayHandler}
        deleteHandler={deleteHandler}
      />
      <Dialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dialogTitle={"Add more"}
        submitHandler={onSubmitHandler}
        isClicked={isClicked}
      >
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <p>From</p>
            <ListboxComponent
              items={allAvailability}
              availabilityHandler={availabilityHandler}
              time="startedTime"
            />
            {availabilityError.startedTime && (
              <p className="text-red-400 text-left">
                {availabilityError.startedTime}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <p>To</p>
            <ListboxComponent
              items={allAvailability}
              availabilityHandler={availabilityHandler}
              time="endedTime"
            />
            {availabilityError.endedTime && (
              <p className="text-red-400 text-left">
                {availabilityError.endedTime}
              </p>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Index;
