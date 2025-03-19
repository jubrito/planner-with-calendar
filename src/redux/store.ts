import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./slices/dateSlice";

const store = configureStore({
  reducer: {
    updateDate: dateSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export default store;
