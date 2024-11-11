"use client";

import Button1 from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import UserAccount from "@/app/components/myAccount/user";
import { useAppSelector } from "@/app/lib/store/hook";
import { myAccountSchema } from "@/app/lib/validations/myAccount";
import { MapPin, Video } from "lucide-react";
import { useEffect, useState } from "react";
import ReactGooglePlaceSuggest from "react-google-place-suggest";

const methods = ["Online", "In-Person"];

const Index = () => {
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    bio: "",
    hourlyRate: "",
  });
  const [location, setLocation] = useState({
    address: "",
    lat: "",
    lng: "",
  });

  const [miles, setMiles] = useState("");
  const [milesError, setmilesError] = useState("");

  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const [gradesError, setGradesError] = useState("");
  const [subjectsError, setSubjectsError] = useState("");
  const [methodsError, setMethodsError] = useState("");
  const [userInfoError, setUserInfoError] = useState({
    name: "",
    bio: "",
    hourlyRate: "",
  });
  const [locationError, setLocationError] = useState({
    address: "",
    lat: "",
    lng: "",
  });
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

  const addressHandler = (value) => {
    setLocation({
      address: value?.formatted_address,
      lat: value?.geometry.location.lat(),
      lng: value?.geometry.location.lng(),
    });
    setLocationError({
      address: "",
      lat: "",
      lng: "",
    });
  };

  const milesHandler = (event) => {
    setmilesError("");
    setMiles(event.target.value);
  };

  const onSubmitHandler = async () => {
    setIsClicked(true);
    setSuccessMessage("");
    try {
      const obj = {
        name: userInfo.name,
        bio: userInfo.bio,
        address: location.address,
        lat: location.lat,
        lng: location.lng,
        miles: Number(miles) || 0,
        hourlyRate: Number(userInfo.hourlyRate || 0),
        grades: selectedGrades.map((el) => el._id),
        subjects: selectedSubjects.map((el) => el._id),
        availableOn: selectedMethods.map((el) => el),
      };
      myAccountSchema(selectedMethods.includes("In-Person")).parse(obj);
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
          bio: result.bio,
          hourlyRate: result.hourlyRate,
        });
        setLocationError(result.location);
        setmilesError(result.location.miles);
      }
    } catch (errors) {
      setIsClicked(false);
      const formattedErrors = errors?.issues?.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      if (formattedErrors) {
        setGradesError(formattedErrors.grades);
        setSubjectsError(formattedErrors.subjects);
        setMethodsError(formattedErrors.availableOn);
        setmilesError(formattedErrors.miles);
        setUserInfoError(formattedErrors);
        setLocationError(formattedErrors);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setSelectedGrades(data.grades);
      setSelectedSubjects(data.subjects);
      setSelectedMethods(data.availableOn);
      setUserInfo({
        name: data.name,
        bio: data.bio,
        hourlyRate: data.hourlyRate,
      });
      setLocation(data.location);
      setMiles(data.miles);
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
              <label>Your Location</label>
              <div>
                <ReactGooglePlaceSuggest
                  handlePlaceSelect={addressHandler}
                  apiKey={process.env.GOOGLE_MAPS_API_KEY}
                  inputClass={{
                    padding: "p-2",
                    width: "100%",
                    borderWidth: "1px",
                    borderRadius: "4px",
                  }}
                />
                {locationError.address && (
                  <p className="text-red-400 text-left">
                    {locationError.address}
                  </p>
                )}
              </div>
            </div>
            {selectedMethods.includes("In-Person") && (
              <div className="space-y-1">
                <label>
                  Enter miles as far as you can go for in-person tutoring
                </label>
                <div>
                  <Input
                    placeholder="100"
                    type="number"
                    name={"miles"}
                    changeHandler={milesHandler}
                    value={miles}
                  />
                  {milesError && (
                    <p className="text-red-400 text-left">{milesError}</p>
                  )}
                </div>
              </div>
            )}
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
              <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 text-nowrap mt-1">
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
                      {method === "In-Person" && (
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
