import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from '../../../utils/utils';
import {
  EventsByDates,
  EventStored,
  SelectedEventOnDayView,
} from '../../../types/event';
import { formatDateIDFromDate } from '../../../utils/events/utils';

type InitialEventsInfoState = {
  events: EventStored[];
  eventsByDates: EventsByDates;
  selectedDayViewEvent?: SelectedEventOnDayView;
};

export type InitialState = {
  initialState: InitialEventsInfoState;
  currentState: InitialEventsInfoState;
};

type AddEvent = {
  newEvent: EventStored;
  ISODate: string;
};

const initialEventsInfo: InitialEventsInfoState = {
  events: [],
  eventsByDates: {},
  selectedDayViewEvent: undefined,
};

export const initialValue: InitialState = {
  initialState: deepCopy(initialEventsInfo),
  currentState: deepCopy(initialEventsInfo),
};

export const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: initialValue,
  reducers: {
    addEvent(state: InitialState, action: PayloadAction<AddEvent>) {
      const events = state.currentState.events;
      const { newEvent, ISODate } = action.payload;
      state.currentState.events = [...events, newEvent];
      const eventsByDates = { ...state.currentState.eventsByDates };
      const id = formatDateIDFromDate(ISODate);
      state.currentState.eventsByDates = {
        ...eventsByDates,
        [id]: {
          events: [...(eventsByDates[id]?.events || []), newEvent],
        },
      };
    },
    updateSelectedDayViewEvent(
      state: InitialState,
      action: PayloadAction<SelectedEventOnDayView>,
    ) {
      state.currentState.selectedDayViewEvent = action.payload;
    },
    clearSelectedDayViewEvent(state: InitialState) {
      // closes event details modal
      state.currentState.selectedDayViewEvent = undefined;
    },
  },
});

export const {
  addEvent,
  updateSelectedDayViewEvent,
  clearSelectedDayViewEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
