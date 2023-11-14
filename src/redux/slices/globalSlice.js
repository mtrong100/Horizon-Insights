import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    sidebarOpen: false,
    blogId: "",
    isUpdate: false,
    cmtData: null,
  },
  reducers: {
    setFollowPending: (state, action) => {
      const { userId, value } = action.payload;
      state[userId] = value;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    storeBlogId: (state, action) => {
      state.blogId = action.payload;
    },
    storeCmtData: (state, action) => {
      state.cmtData = action.payload;
    },
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
  },
});

export const {
  setFollowPending,
  setSidebarOpen,
  storeBlogId,
  storeCmtData,
  setIsUpdate,
} = globalSlice.actions;

export default globalSlice.reducer;
