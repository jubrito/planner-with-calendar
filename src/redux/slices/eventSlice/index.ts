import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from '../../../utils/utils';
import {
  EventsByDates,
  EventStored,
  EventOnDayView,
} from '../../../types/event';
import { formatDateIDFromDate } from '../../../utils/events/utils';

type InitialEventsInfoState = {
  eventsByDates: EventsByDates;
  eventOnViewMode?: EventOnDayView;
  eventOnUpdate?: EventOnDayView;
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
  eventsByDates: {},
  eventOnViewMode: undefined,
  eventOnUpdate: undefined,
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
      action: PayloadAction<EventOnDayView>,
    ) {
      state.currentState.eventOnViewMode = action.payload;
    },
    clearEventOnViewMode(state: InitialState) {
      // closes View Event Details modal
      state.currentState.eventOnViewMode = undefined;
    },
    updateEventOnUpdate(
      state: InitialState,
      action: PayloadAction<EventOnDayView>,
    ) {
      state.currentState.eventOnUpdate = action.payload;
    },
    clearEventOnUpdate(state: InitialState) {
      // closes Create/Update Event modal
      state.currentState.eventOnUpdate = undefined;
    },
  },
});

export const {
  addEvent,
  updateEventOnViewMode,
  clearEventOnViewMode,
  updateEventOnUpdate,
  clearEventOnUpdate,
} = eventSlice.actions;

export default eventSlice.reducer;
