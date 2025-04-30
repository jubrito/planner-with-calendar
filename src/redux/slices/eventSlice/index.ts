import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from '../../../utils/utils';
import { EventStored, SelectedEventOnDayView } from '../../../types/event';

type InitialEventsInfoState = {
  events: EventStored[];
  selectedDayViewEvent?: SelectedEventOnDayView;
};

export type InitialState = {
  initialState: InitialEventsInfoState;
  currentState: InitialEventsInfoState;
};

const initialEventsInfo: InitialEventsInfoState = {
  events: [],
  selectedDayViewEvent: undefined,
};

const initialValue: InitialState = {
  initialState: deepCopy(initialEventsInfo),
  currentState: deepCopy(initialEventsInfo),
};

export const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: initialValue,
  reducers: {
    addEvent(state: InitialState, action: PayloadAction<EventStored>) {
      const events = state.currentState.events;
      const newEvent = action.payload;
      const updatedEvents = [...events, newEvent];
      state.currentState.events = updatedEvents;
    },
    // updateSelectedEvent(state: InitialState, action: PayloadAction<SelectedEventOnDayView>) {

    // }
  },
});

export const { addEvent } = eventSlice.actions;

export default eventSlice.reducer;
