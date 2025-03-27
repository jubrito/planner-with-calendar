import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateConfig } from '../../../types/calendar/types';
import { deepCopy } from '../../../utils/utils';
import { getDateISOString } from '../../../utils/calendar/utils';

export type InitialDateState = {
  dateISO: string;
};

export type InitialState = {
  initialState: InitialDateState;
  currentState: InitialDateState;
};

const initialDate: InitialDateState = {
  dateISO: getDateISOString(new Date()),
};

export const initialValue: InitialState = {
  initialState: deepCopy(initialDate),
  currentState: deepCopy(initialDate),
};

export const dateSlice = createSlice({
  name: 'dateSlice',
  initialState: initialValue,
  reducers: {
    updateDate: (
      state,
      action: PayloadAction<{
        year: DateConfig['year'];
        month: DateConfig['month'];
        day: DateConfig['day'];
      }>,
    ) => {
      const { year, month, day } = action.payload;
      state.currentState.dateISO = getDateISOString(new Date(year, month, day));
    },
  },
});

export const { updateDate } = dateSlice.actions;

export default dateSlice.reducer;
