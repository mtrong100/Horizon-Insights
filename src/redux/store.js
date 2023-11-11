import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slices/globalSlice";

export const reducer = combineReducers({
  global: globalSlice,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
