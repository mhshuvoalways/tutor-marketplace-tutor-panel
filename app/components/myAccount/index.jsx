import Button1 from "@/app/components/common/button/Button";
import AutoComplete from "@/app/components/common/input/AutoComplete";
import Input from "@/app/components/common/input/Input";
import UserAccount from "@/app/components/myAccount/user";
import { MapPin, Video } from "lucide-react";

const methods = [
  {
    _id: 1,
    name: "Online",
  },
  {
    _id: 2,
    name: "Offline",
  },
  {
    _id: 3,
    name: "Student place",
  },
  {
    _id: 4,
    name: "Tutor place",
  },
];

const grades = [
  {
    _id: 1,
    name: "K-5",
  },
  {
    _id: 2,
    name: "6-8",
  },
  {
    _id: 3,
    name: "9-12",
  },
];

const subjects = [
  {
    _id: 1,
    name: "Science",
  },
  {
    _id: 2,
    name: "Math",
  },
  {
    _id: 3,
    name: "English",
  },
  {
    _id: 4,
    name: "Accounting",
  },
  {
    _id: 5,
    name: "Programming",
  },
];

const index = () => {
  return (
    <div className="space-y-10">
      <UserAccount />
      <div className="bg-white rounded shadow-sm p-5">
        <p className="text-2xl">User information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <div className="space-y-5">
            <div className="space-y-1">
              <label>Your Name</label>
              <Input placeholder="John doe" />
            </div>
            <div className="space-y-1">
              <label>Your Location</label>
              <AutoComplete />
            </div>
            <div className="space-y-1">
              <label>Your hourly rate</label>
              <Input placeholder="34" type="number" />
            </div>
            <div className="space-y-1">
              <label>Write yourself</label>
              <textarea
                placeholder="I am a professional math tutor with 4 years of ex..."
                className="outline-0 border rounded py-2 px-2 w-full transition h-40"
              />
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <label>My grades</label>
              <div className="flex items-center flex-wrap gap-3 text-nowrap mt-1">
                {grades.map((method) => (
                  <div
                    className="bg-slate-50 py-1 px-5 rounded cursor-pointer hover:bg-slate-200 transition"
                    key={method._id}
                  >
                    <p>{method.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label>My Subjects</label>
              <div className="flex items-center flex-wrap gap-3 text-nowrap mt-1">
                {subjects.map((method) => (
                  <div
                    className="bg-slate-50 py-1 px-5 rounded cursor-pointer hover:bg-slate-200 transition"
                    key={method._id}
                  >
                    <p>{method.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label>Available on</label>
              <div className="flex items-center flex-wrap 2xl:flex-nowrap gap-3 text-nowrap mt-1">
                {methods.map((method) => (
                  <div
                    className="inline-flex items-center justify-center gap-x-3 sm:gap-x-5 bg-slate-50 py-2 px-3 w-full rounded cursor-pointer hover:bg-slate-200 transition"
                    key={method._id}
                  >
                    {method.name === "Online" && (
                      <Video className="text-red-400" />
                    )}
                    {method.name === "Offline" && (
                      <MapPin className="text-blue-400" />
                    )}
                    {method.name === "Tutor place" && (
                      <MapPin className="text-red-400" />
                    )}
                    {method.name === "Student place" && (
                      <MapPin className="text-red-400" />
                    )}
                    <p>{method.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 w-32 ml-auto">
          <Button1 title={"Change"} />
        </div>
      </div>
    </div>
  );
};

export default index;
