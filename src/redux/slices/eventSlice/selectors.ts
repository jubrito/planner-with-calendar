import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { formatDateIDFromDate } from '../../../utils/events/utils';

const eventSlice = (state: RootState) => state.eventSlice;

export const getInitialEventsByDates = () =>
  createSelector(eventSlice, (state) => state.initialState.eventsByDates);

export const getCurrentEventsByDates = () =>
  createSelector(eventSlice, (state) => state.currentState.eventsByDates);

export const getInitialEventOnViewMode = () =>
  createSelector(eventSlice, (state) => state.initialState.eventOnViewMode);

export const getCurrentEventOnViewMode = () =>
  createSelector(eventSlice, (state) => state.currentState.eventOnViewMode);

export const getInitialeventOnUpdateMode = () =>
  createSelector(eventSlice, (state) => state.initialState.eventOnUpdateMode);

export const getCurrenteventOnUpdateMode = () =>
  createSelector(eventSlice, (state) => state.currentState.eventOnUpdateMode);

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
