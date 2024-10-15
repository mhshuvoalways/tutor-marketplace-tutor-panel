import { createSlice } from "@reduxjs/toolkit";

export const gradeSlice = createSlice({
  name: "grade",
  initialState: {
    id: "",
    item: "",
  },
  reducers: {
    update: (state, actions) => {
      const { id, item } = actions.payload;
      state.id = id;
      state.item = item;
    },
  },
});

export const { update } = gradeSlice.actions;

export default gradeSlice.reducer;
