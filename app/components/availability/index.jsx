"use client";

import Availability from "@/app/components/availability/Availability";
import Dialog from "@/app/components/common/headlessui/Dialog";
import ListboxComponent from "@/app/components/common/headlessui/ListBox";
import { useAppSelector } from "@/app/lib/store/hook";
import { availabilityValidation } from "@/app/lib/validations/availability";
import allAvailability from "@/app/services/allAvailability";
import timeDifference from "@/app/services/timeDifference";
import { useEffect, useState } from "react";
import Button1 from "../common/button/Button";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mySession, setMySession] = useState();
  const [mySessionError, setMySessionError] = useState({});
  const [mySessionSuccess, setMySessionSuccess] = useState();
  const [availability, setAvailablility] = useState({
    day: "",
    startedTime: allAvailability[0],
    endedTime: allAvailability[4],
    timeZone: "",
  });

  const [availabilityError, setAvailablilityError] = useState({
    startedTime: "",
    endedTime: "",
    message: "",
  });

  const [avail, setAvail] = useState([]);

  const [isClicked, setIsClicked] = useState(false);

  const { data } = useAppSelector((store) => store.myAccount);

  const availabilityDayHandler = (day) => {
    setAvailablility({
      day: day,
      startedTime: allAvailability[0],
      endedTime: allAvailability[4],
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
    const sessionTime = timeDifference(
      availability.startedTime,
      availability.endedTime
    );
    if (Math.abs(sessionTime) >= mySession * 60) {
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
    } else {
      setAvailablilityError({
        message: `You must select at least ${mySession} hour`,
      });
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

  const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const timeHandler = (_, time) => {
    setMySession(time);
  };

  const sessionSubmitHandler = async () => {
    setIsClicked(true);
    const response = await fetch("/api/availability", {
      method: "PUT",
      body: JSON.stringify({ mySession }),
    });
    setIsClicked(false);
    const result = await response.json();
    if (response.status === 200) {
      setIsOpen(false);
      setMySessionSuccess(result);
      setTimeout(() => {
        setMySessionSuccess("");
      }, 3000);
    } else {
      setMySessionError(result);
    }
  };

  useEffect(() => {
    if (!mySession) {
      setMySession(data?.session);
    }
  }, [data?.session, mySession]);

  return (
    <>
      <div className="mb-5">
        <div className="flex gap-2">
          <div className="space-y-5">
            <ListboxComponent
              items={times}
              availabilityHandler={timeHandler}
              value={mySession}
            />
          </div>
          <div>
            <Button1 title={"Save"} onClick={sessionSubmitHandler} />
          </div>
        </div>
        <p className="text-gray-700">
          A session indicating the number of hours students can book with you
        </p>
        {mySessionError?.message && (
          <p className="text-red-400">{mySessionError?.message}</p>
        )}
        {mySessionSuccess && (
          <p className="text-green-400">{mySessionSuccess}</p>
        )}
      </div>
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
              value={availability.startedTime}
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
              value={availability.endedTime}
            />
            {availabilityError.endedTime && (
              <p className="text-red-400 text-left">
                {availabilityError.endedTime}
              </p>
            )}
          </div>
        </div>
        {availabilityError.message && (
          <p className="text-red-400 text-left">{availabilityError.message}</p>
        )}
      </Dialog>
    </>
  );
};

export default Index;
