import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from '../../../utils/utils';
import { Event } from '../../../types/event';

type InitialEventsInfoState = {
  events: Event[];
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
    addEvent(state: InitialState, action: PayloadAction<Event>) {
      const events = state.currentState.events;
      const newEvent = action.payload;
      events.push(newEvent);
      state.currentState.events = events;
    },
  },
});

export const { addEvent } = eventSlice.actions;

export default eventSlice.reducer;
