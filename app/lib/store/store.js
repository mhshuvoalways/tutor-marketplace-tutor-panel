import myAccountSlice from "@/app/lib/store/features/myAccountSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      myAccount: myAccountSlice,
    },
  });
};
