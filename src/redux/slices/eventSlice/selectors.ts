import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { formatDateIDFromDate } from '../../../utils/events/utils';

const eventSlice = (state: RootState) => state.eventSlice;

export const getInitialEventsByDates = () =>
  createSelector(eventSlice, (state) => state.initialState.eventsByDates);

export const getCurrentEventsByDates = () =>
  createSelector(eventSlice, (state) => state.currentState.eventsByDates);

export const getInitialSelectedDayViewEvent = () =>
  createSelector(eventSlice, (state) => state.initialState.eventOnViewMode);

export const getCurrentSelectedDayViewEvent = () =>
  createSelector(eventSlice, (state) => state.currentState.eventOnViewMode);

export const getInitialEventsOfSelectedDate = (ISODate: string) =>
  createSelector(eventSlice, (state) => {
    const id = formatDateIDFromDate(ISODate);
    const eventsByDate = state.initialState.eventsByDates[id];
    return eventsByDate ? eventsByDate.events : [];
  });

export const getCurrentEventsOfSelectedDate = (ISODate: string) =>
  createSelector(eventSlice, (state) => {
    const id = formatDateIDFromDate(ISODate);
    const eventsByDate = state.currentState.eventsByDates[id];
    return eventsByDate ? eventsByDate.events : [];
  });
