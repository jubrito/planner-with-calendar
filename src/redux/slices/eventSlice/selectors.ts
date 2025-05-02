import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const eventSlice = (state: RootState) => state.eventSlice;

export const getInitialEvents = () =>
  createSelector(eventSlice, (state) => state.initialState.events);

export const getCurrentEvents = () =>
  createSelector(eventSlice, (state) => state.currentState.events);

export const getInitialEventsByDates = () =>
  createSelector(eventSlice, (state) => state.initialState.eventsByDates);

export const getCurrentEventsByDates = () =>
  createSelector(eventSlice, (state) => state.currentState.eventsByDates);

export const getInitialSelectedDayViewEvent = () =>
  createSelector(
    eventSlice,
    (state) => state.initialState.selectedDayViewEvent,
  );

export const getCurrentSelectedDayViewEvent = () =>
  createSelector(
    eventSlice,
    (state) => state.currentState.selectedDayViewEvent,
  );

export const getInitialEventsOfSelectedDate = (ISODate: string) =>
  createSelector(eventSlice, (state) => {
    const eventsByDate = state.initialState.eventsByDates[ISODate];
    return eventsByDate ? eventsByDate.events : [];
  });
