import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    sidebarOpen: false,
    blogId: "",
  },
  reducers: {
    setFollowPending: (state, action) => {
      const { userId, value } = action.payload;
      state[userId] = value;
    },
    setSidebarOpen: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    storeBlogId: (state, action) => {
      state.blogId = action.payload;
    },
  },
});

export const { setFollowPending, setSidebarOpen, storeBlogId } =
  globalSlice.actions;

export default globalSlice.reducer;
