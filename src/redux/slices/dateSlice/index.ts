import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateConfig } from "../../../types/calendar/types";
import { deepCopy } from "../../../utils/utils";
import { getFormatedDateString } from "../../../utils/calendar/current";
import { defaultLocale } from "../../../utils/locale/constants";

export type InitialDateState = {
  date: string;
};

export type InitialState = {
  initialState: InitialDateState;
  currentState: InitialDateState;
};

const initialDate: InitialDateState = {
  date: getFormatedDateString(defaultLocale, new Date()),
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
      state.currentState.date = getFormatedDateString(
        defaultLocale,
        new Date(year, month, day)
      );
    },
  },
});

export const { updateDate } = dateSlice.actions;

export default dateSlice.reducer;
