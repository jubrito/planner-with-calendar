import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from '../../../utils/utils';
import { Event } from '../../../types/event';

type InitialEventsInfoState = {
  allEvents: Event[];
  event: Event;
  selectedEvent?: Event;
};

export type InitialState = {
  initialState: InitialEventsInfoState;
  currentState: InitialEventsInfoState;
};

const initialEvent: Event = {
  id: 'string',
  title: 'string',
  startDate: new Date(),
  endDate: new Date(),
  dayViewPositionY: {
    start: 0,
    end: 0,
  },
};

const initialEventsInfo: InitialEventsInfoState = {
  allEvents: [],
  event: initialEvent,
  selectedEvent: undefined,
};

const initialValue: InitialState = {
  initialState: deepCopy(initialEventsInfo),
  currentState: deepCopy(initialEventsInfo),
};

export const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: initialValue,
  reducers: {
    clearSelectedEvent(state: InitialState) {
      state.currentState.selectedEvent = state.initialState.selectedEvent;
    },
    updateSelectedEvent(state: InitialState, action: PayloadAction<Event>) {
      state.currentState.selectedEvent = action.payload;
    },
    addEvent(state: InitialState, action: PayloadAction<Event>) {
      const events = state.currentState.allEvents;
      events.push(action.payload);
      state.currentState.allEvents = events;
    },
  },
});

export const { addEvent, clearSelectedEvent, updateSelectedEvent } =
  eventSlice.actions;

export default eventSlice.reducer;
