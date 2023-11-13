import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {},
  reducers: {
    setFollowPending: (state, action) => {
      const { userId, value } = action.payload;
      state[userId] = value;
    },
  },
});

export const { setFollowPending } = globalSlice.actions;

export default globalSlice.reducer;
