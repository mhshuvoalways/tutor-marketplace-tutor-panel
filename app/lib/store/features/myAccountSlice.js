import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMyAccount = createAsyncThunk(
  "myAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/myAccount", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      return await response.json();
    } catch {
      return rejectWithValue("Failed to get my account");
    }
  }
);

export const myAccount = createSlice({
  name: "myAccount",
  initialState: {
    isLoadingGet: false,
    errors: {},
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyAccount.pending, (state) => {
        state.isLoadingGet = true;
        state.errors = {};
      })
      .addCase(getMyAccount.fulfilled, (state, action) => {
        state.isLoadingGet = false;
        state.data = action.payload;
      })
      .addCase(getMyAccount.rejected, (state, action) => {
        state.isLoadingGet = false;
        state.errors = {
          message: action.payload,
        };
      });
  },
});

export default myAccount.reducer;
