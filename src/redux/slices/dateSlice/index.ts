import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateConfig } from "../../../types/calendar/types";
import { deepCopy } from "../../../utils/utils";

export type InitialDateState = {
  date: string;
};

export type InitialState = {
  initialState: InitialDateState;
  currentState: InitialDateState;
};

const initialDate: InitialDateState = {
  date: new Date().toLocaleDateString(),
};

export const initialValue: InitialState = {
  initialState: deepCopy(initialDate),
  currentState: deepCopy(initialDate),
};

export const dateSlice = createSlice({
  name: "dateSlice",
  initialState: initialValue,
  reducers: {
    updateDate: (
      state,
      action: PayloadAction<{
        year: DateConfig["year"];
        month: DateConfig["month"];
        day: DateConfig["day"];
      }>
    ) => {
      const { year, month, day } = action.payload;
      state.currentState.date = new Date(year, month, day).toDateString();
    },
  },
});

export const { updateDate } = dateSlice.actions;

export default dateSlice.reducer;
