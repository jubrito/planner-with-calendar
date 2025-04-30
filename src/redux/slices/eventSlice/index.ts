import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from '../../../utils/utils';
import { EventStored, EventOnCreation } from '../../../types/event';
import { getDateISOString } from '../../../utils/calendar/utils';

type InitialEventsInfoState = {
  events: EventStored[];
};

export type InitialState = {
  initialState: InitialEventsInfoState;
  currentState: InitialEventsInfoState;
};

const initialEventsInfo: InitialEventsInfoState = {
  events: [],
};

const initialValue: InitialState = {
  initialState: deepCopy(initialEventsInfo),
  currentState: deepCopy(initialEventsInfo),
};

export const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: initialValue,
  reducers: {
    addEvent(state: InitialState, action: PayloadAction<EventOnCreation>) {
      const events = state.currentState.events;
      const eventOnCreation = action.payload;
      const newEvent = {
        ...eventOnCreation,
        endDate: getDateISOString(eventOnCreation.endDate),
        startDate: getDateISOString(eventOnCreation.startDate),
      };

      events.push(newEvent);
      state.currentState.events = events;
    },
  },
});

export const { addEvent } = eventSlice.actions;

export default eventSlice.reducer;
