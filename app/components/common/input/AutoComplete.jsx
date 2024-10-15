"use client";

import Autocomplete from "react-google-autocomplete";

const AutoComplete = ({ addressHandler }) => {
  return (
    <Autocomplete
      apiKey={process.env.GOOGLE_MAPS_API_KEY}
      onPlaceSelected={(place) => addressHandler(place.formatted_address)}
      className="outline-0 border rounded py-2 px-2 w-full transition"
    />
  );
};

export default AutoComplete;
