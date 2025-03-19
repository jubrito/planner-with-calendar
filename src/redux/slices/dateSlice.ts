import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateConfig } from "../../types/calendar/types";
import { deepCopy } from "../../utils/utils";

type InitialDateState = {
  date: DateConfig["date"];
};

type InitialState = {
  initialState: InitialDateState;
  currentState: InitialDateState;
};

const initialDate: InitialDateState = {
  date: new Date(),
};

const initialValue: InitialState = {
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
      state.currentState.date = new Date(year, month, day);
    },
  },
});

export const { updateDate } = dateSlice.actions;

export default dateSlice.reducer;
