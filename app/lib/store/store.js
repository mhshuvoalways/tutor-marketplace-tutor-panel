import gradeSlice from "@/app/lib/store/features/gradeSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      grade: gradeSlice,
    },
  });
};
