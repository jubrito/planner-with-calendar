import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateConfig } from '../../../types/calendar/types';
import { deepCopy } from '../../../utils/utils';
import { getDateISOString } from '../../../utils/calendar/utils';

export type InitialDateState = {
  globalISODate: string;
  dayViewISODate: string;
};

export type InitialState = {
  initialState: InitialDateState;
  currentState: InitialDateState;
};

const initialDate: InitialDateState = {
  globalISODate: getDateISOString(new Date()),
  dayViewISODate: getDateISOString(new Date()),
};

export const initialValue: InitialState = {
  initialState: deepCopy(initialDate),
  currentState: deepCopy(initialDate),
};

export const dateSlice = createSlice({
  name: 'dateSlice',
  initialState: initialValue,
  reducers: {
    updateGlobalISODate: (
      state,
      action: PayloadAction<{
        year: DateConfig['year'];
        month: DateConfig['month'];
        day: DateConfig['day'];
      }>,
    ) => {
      const { year, month, day } = action.payload;
      state.currentState.globalISODate = getDateISOString(
        new Date(year, month, day),
      );
    },
    updateDayViewISODate: (
      state,
      action: PayloadAction<{
        year: DateConfig['year'];
        month: DateConfig['month'];
        day: DateConfig['day'];
      }>,
    ) => {
      const { year, month, day } = action.payload;
      state.currentState.dayViewISODate = getDateISOString(
        new Date(year, month, day),
      );
    },
  },
});

export const { updateGlobalISODate, updateDayViewISODate } = dateSlice.actions;

export default dateSlice.reducer;
