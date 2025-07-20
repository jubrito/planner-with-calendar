import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from '../../../utils/utils';
import {
  EventsByDates,
  EventStored,
  EventTargeted,
} from '../../../types/event';
import { formatDateIDFromDate } from '../../../utils/events/utils';
import { getDateISOString } from '../../../utils/calendar/utils';

type InitialEventsInfoState = {
  eventsByDates: EventsByDates;
  eventOnViewMode?: EventTargeted;
  eventOnUpdateMode?: EventTargeted;
};

export type InitialState = {
  initialState: InitialEventsInfoState;
  currentState: InitialEventsInfoState;
};

type AddEvent = {
  newEvent: EventStored;
  ISODate: string;
};

export const drafteventOnUpdateMode = {
  id: '',
  title: '',
  startDate: getDateISOString(new Date()),
  endDate: getDateISOString(new Date()),
};

const initialEventsInfo: InitialEventsInfoState = {
  eventsByDates: {},
  eventOnViewMode: undefined,
  eventOnUpdateMode: undefined,
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
      const { newEvent, ISODate } = action.payload;
      const eventsByDates = { ...state.currentState.eventsByDates };
      const id = formatDateIDFromDate(ISODate);
      state.currentState.eventsByDates = {
        ...eventsByDates,
        [id]: {
          events: [...(eventsByDates[id]?.events || []), newEvent],
        },
      };
    },
    updateEventOnViewMode(
      state: InitialState,
      action: PayloadAction<EventTargeted>,
    ) {
      state.currentState.eventOnViewMode = action.payload;
    },
    clearEventOnViewMode(state: InitialState) {
      // closes View Event Details modal
      state.currentState.eventOnViewMode = undefined;
    },
    updateEventOnUpdateMode(
      state: InitialState,
      action: PayloadAction<EventTargeted>,
    ) {
      state.currentState.eventOnUpdateMode = action.payload;
    },
    clearEventOnUpdateMode(state: InitialState) {
      // closes Create/Update Event modal
      state.currentState.eventOnUpdateMode = undefined;
    },
  },
});

export const {
  addEvent,
  updateEventOnViewMode,
  clearEventOnViewMode,
  updateEventOnUpdateMode,
  clearEventOnUpdateMode,
} = eventSlice.actions;

export default eventSlice.reducer;
