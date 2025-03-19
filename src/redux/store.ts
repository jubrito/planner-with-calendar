import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./slices/dateSlice";

export default configureStore({
  reducer: {
    updateDate: dateSlice,
  },
});
