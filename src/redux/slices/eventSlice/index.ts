import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from '../../../utils/utils';
import { Event } from '../../../types/event';

type InitialEventsInfoState = {
  allEvents: Event[];
  eventByIdMap: Record<Event['id'], Event>;
  selectedEvent?: Event;
};

export type InitialState = {
  initialState: InitialEventsInfoState;
  currentState: InitialEventsInfoState;
};

const initialEventsInfo: InitialEventsInfoState = {
  allEvents: [],
  eventByIdMap: {},
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
      const newEvent = action.payload;
      events.push(newEvent);
      state.currentState.eventByIdMap[newEvent.id] = newEvent;
      state.currentState.allEvents = events;
    },
  },
});

export const { addEvent, clearSelectedEvent, updateSelectedEvent } =
  eventSlice.actions;

export default eventSlice.reducer;
