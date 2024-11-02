"use client";

import Button1 from "@/app/components/common/button/Button";
import Listbox from "@/app/components/common/headlessui/ListBox";
import AutoComplete from "@/app/components/common/input/AutoComplete";
import Input from "@/app/components/common/input/Input";
import UserAccount from "@/app/components/myAccount/user";
import { useAppSelector } from "@/app/lib/store/hook";
import { myAccountSchema } from "@/app/lib/validations/myAccount";
import { MapPin, Video } from "lucide-react";
import { useEffect, useState } from "react";

const methods = ["Online", "Student place", "Tutor place"];
const genders = ["Male", "Female", "Both"];

const Index = () => {
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    gender: genders[0],
    bio: "",
    hourlyRate: "",
  });
  const [location, setLocation] = useState("");

  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const [gradesError, setGradesError] = useState("");
  const [subjectsError, setSubjectsError] = useState("");
  const [methodsError, setMethodsError] = useState("");
  const [userInfoError, setUserInfoError] = useState({
    name: "",
    gender: "",
    bio: "",
    hourlyRate: "",
  });
  const [locationError, setLocationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data } = useAppSelector((store) => store.myAccount);

  useEffect(() => {
    async function fetchFunction() {
      const response = await fetch("/api/grade", {
        method: "GET",
      });
      setGrades(await response.json());
    }
    fetchFunction();
  }, []);

  useEffect(() => {
    async function fetchFunction() {
      const response = await fetch("/api/subject", {
        method: "GET",
      });
      setSubjects(await response.json());
    }
    fetchFunction();
  }, []);

  const gradesSelectedHandler = (item) => {
    setGradesError("");
    const temp = [...selectedGrades];
    const isSelected = temp.find((el) => el._id === item._id);
    if (isSelected) {
      const updatedTemp = temp.filter((el) => el._id !== item._id);
      setSelectedGrades(updatedTemp);
    } else {
      setSelectedGrades([...temp, item]);
    }
  };

  const subjectSelectedHandler = (item) => {
    setSubjectsError("");
    const temp = [...selectedSubjects];
    const isSelected = temp.find((el) => el._id === item._id);
    if (isSelected) {
      const updatedTemp = temp.filter((el) => el._id !== item._id);
      setSelectedSubjects(updatedTemp);
    } else {
      setSelectedSubjects([...temp, item]);
    }
  };

  const methodsSelectedHandler = (item) => {
    setMethodsError("");
    const temp = [...selectedMethods];
    const isSelected = temp.find((el) => el === item);
    if (isSelected) {
      const updatedTemp = temp.filter((el) => el !== item);
      setSelectedMethods(updatedTemp);
    } else {
      setSelectedMethods([...temp, item]);
    }
  };

  const onChangeHandler = (event) => {
    setUserInfoError({
      ...userInfoError,
      [event.target.name]: "",
    });
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const genderHandler = (value) => {
    setUserInfoError({
      ...userInfoError,
      gender: "",
    });
    setUserInfo({
      ...userInfo,
      gender: value,
    });
  };

  const addressHandler = (value) => {
    setLocation(value);
    setLocationError("");
  };

  const onSubmitHandler = async () => {
    setIsClicked(true);
    setSuccessMessage("");
    try {
      const obj = {
        name: userInfo.name,
        gender: userInfo.gender,
        bio: userInfo.bio,
        location: location,
        hourlyRate: Number(userInfo.hourlyRate || 0),
        grades: selectedGrades.map((el) => el._id),
        subjects: selectedSubjects.map((el) => el._id),
        availableOn: selectedMethods.map((el) => el),
      };
      myAccountSchema.parse(obj);
      const response = await fetch("/api/myAccount", {
        method: "POST",
        body: JSON.stringify(obj),
      });
      setIsClicked(false);
      if (response.status === 200) {
        setSuccessMessage("Updated");
      } else {
        const result = await response.json();
        setGradesError(result.grades);
        setSubjectsError(result.subjects);
        setMethodsError(result.availableOn);
        setUserInfoError({
          name: result.name,
          gender: result.gender,
          bio: result.bio,
          hourlyRate: result.hourlyRate,
        });
        setLocationError(result.location);
      }
    } catch (errors) {
      setIsClicked(false);
      const formattedErrors = errors?.issues?.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setGradesError(formattedErrors.grades);
      setSubjectsError(formattedErrors.subjects);
      setMethodsError(formattedErrors.availableOn);
      setUserInfoError({
        name: formattedErrors.name,
        gender: formattedErrors.gender,
        bio: formattedErrors.bio,
        hourlyRate: formattedErrors.hourlyRate,
      });
      setLocationError(formattedErrors.location);
    }
  };

  useEffect(() => {
    if (data) {
      setSelectedGrades(data.grades);
      setSelectedSubjects(data.subjects);
      setSelectedMethods(data.availableOn);
      setUserInfo({
        name: data.name,
        gender: data.gender || genders[0],
        bio: data.bio,
        hourlyRate: data.hourlyRate,
      });
      setLocation(data.location);
    }
  }, [data]);

  return (
    <div className="space-y-10">
      <UserAccount />
      <div className="bg-white rounded shadow-sm p-5">
        <p className="text-2xl">User information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <div className="space-y-5">
            <div className="space-y-1">
              <label>Your Name</label>
              <div>
                <Input
                  placeholder="John doe"
                  name="name"
                  value={userInfo.name}
                  changeHandler={onChangeHandler}
                />
                {userInfoError.name && (
                  <p className="text-red-400 text-left">{userInfoError.name}</p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label>Your Gender</label>
              <div>
                <Listbox
                  items={genders}
                  availabilityHandler={genderHandler}
                  value={userInfo.gender}
                />
                {userInfoError.gender && (
                  <p className="text-red-400 text-left">
                    {userInfoError.gender}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label>Your Location</label>
              <div>
                <AutoComplete
                  addressHandler={addressHandler}
                  defaultValue={location}
                />
                {locationError && (
                  <p className="text-red-400 text-left">{locationError}</p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label>Your hourly rate</label>
              <div>
                <Input
                  placeholder="34"
                  type="number"
                  name={"hourlyRate"}
                  changeHandler={onChangeHandler}
                  value={userInfo.hourlyRate}
                />
                {userInfoError.hourlyRate && (
                  <p className="text-red-400 text-left">
                    {userInfoError.hourlyRate}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label>Write yourself</label>
              <div>
                <textarea
                  placeholder="I am a professional math tutor with 4 years of ex..."
                  className="outline-0 border rounded py-2 px-2 w-full transition h-40"
                  name="bio"
                  onChange={onChangeHandler}
                  value={userInfo.bio}
                />
                {userInfoError.bio && (
                  <p className="text-red-400 text-left">{userInfoError.bio}</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <label>My grades</label>
              <div className="flex items-center flex-wrap gap-3 text-nowrap mt-1">
                {grades.map((method) => {
                  const isSelected = selectedGrades?.find(
                    (el) => el._id === method._id
                  );
                  return (
                    <div
                      className={`py-1 px-5 rounded cursor-pointer hover:bg-primary hover:text-white transition ${
                        isSelected ? "bg-primary text-white" : "bg-slate-50"
                      }`}
                      key={method._id}
                      onClick={() => gradesSelectedHandler(method)}
                    >
                      <p>{method.item}</p>
                    </div>
                  );
                })}
              </div>
              {gradesError && (
                <p className="text-red-400 text-left">{gradesError}</p>
              )}
            </div>
            <div>
              <label>My Subjects</label>
              <div className="flex items-center flex-wrap gap-3 text-nowrap mt-1">
                {subjects.map((method) => {
                  const isSelected = selectedSubjects?.find(
                    (el) => el._id === method._id
                  );
                  return (
                    <div
                      className={`py-1 px-5 rounded cursor-pointer hover:bg-primary hover:text-white transition ${
                        isSelected ? "bg-primary text-white" : "bg-slate-50"
                      }`}
                      key={method._id}
                      onClick={() => subjectSelectedHandler(method)}
                    >
                      <p>{method.item}</p>
                    </div>
                  );
                })}
              </div>
              {subjectsError && (
                <p className="text-red-400 text-left">{subjectsError}</p>
              )}
            </div>
            <div>
              <label>Available on</label>
              <div className="flex items-center flex-wrap 2xl:flex-nowrap gap-3 text-nowrap mt-1">
                {methods.map((method) => {
                  const isSelected = selectedMethods?.find(
                    (el) => el === method
                  );
                  return (
                    <div
                      className={`inline-flex items-center justify-center gap-x-3 sm:gap-x-5 py-2 px-3 w-full rounded cursor-pointer hover:bg-primary hover:text-white transition ${
                        isSelected ? "bg-primary text-white" : "bg-slate-50"
                      }`}
                      key={method}
                      onClick={() => methodsSelectedHandler(method)}
                    >
                      {method === "Online" && (
                        <Video className="text-red-400" />
                      )}
                      {method === "Tutor place" && (
                        <MapPin className="text-red-400" />
                      )}
                      {method === "Student place" && (
                        <MapPin className="text-red-400" />
                      )}
                      <p>{method}</p>
                    </div>
                  );
                })}
              </div>
              {methodsError && (
                <p className="text-red-400 text-left">{methodsError}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 w-32 ml-auto">
          <Button1
            title={"Change"}
            isClicked={isClicked}
            onClick={onSubmitHandler}
          />
        </div>
        {successMessage && (
          <p className="text-green-400 text-center">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Index;
