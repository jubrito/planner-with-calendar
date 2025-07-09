import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from '../../../utils/utils';
import {
  EventsByDates,
  EventStored,
  SelectedEventOnDayView,
} from '../../../types/event';
import { formatDateIDFromDate } from '../../../utils/events/utils';

type InitialEventsInfoState = {
  eventsByDates: EventsByDates;
  eventOnViewMode?: SelectedEventOnDayView;
  selectedEventOnCreation?: SelectedEventOnDayView;
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
  selectedEventOnCreation: undefined,
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
    updateeventOnViewMode(
      state: InitialState,
      action: PayloadAction<SelectedEventOnDayView>,
    ) {
      state.currentState.eventOnViewMode = action.payload;
    },
    cleareventOnViewMode(state: InitialState) {
      // closes View Event Details modal
      state.currentState.eventOnViewMode = undefined;
    },
    updateSelectedEventOnCreation(
      state: InitialState,
      action: PayloadAction<SelectedEventOnDayView>,
    ) {
      state.currentState.selectedEventOnCreation = action.payload;
    },
    clearSelectedEventOnCreation(state: InitialState) {
      // closes Create Event modal
      state.currentState.selectedEventOnCreation = undefined;
    },
  },
});

export const {
  addEvent,
  updateeventOnViewMode,
  cleareventOnViewMode,
  updateSelectedEventOnCreation,
  clearSelectedEventOnCreation,
} = eventSlice.actions;

export default eventSlice.reducer;
