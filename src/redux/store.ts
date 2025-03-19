import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./slices/dateSlice";

const setupStore = configureStore({
  reducer: {
    updateDate: dateSlice,
  },
});

export type AppStore = typeof setupStore;
export type RootState = ReturnType<typeof setupStore.getState>;

export default setupStore;
