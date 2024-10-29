import allAvailability from "@/app/services/allAvailability";

function timeDifference(startTime, endTime) {
  function timeToMinutes(time) {
    const index = allAvailability.indexOf(time);
    return index !== -1 ? index * 15 : 0;
  }
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  return endMinutes - startMinutes;
}

export default timeDifference;
