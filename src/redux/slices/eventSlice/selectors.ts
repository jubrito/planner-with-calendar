import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const eventSlice = (state: RootState) => state.eventSlice;

export const getInitialSelectedEvent = () =>
  createSelector(eventSlice, (state) => state.initialState.selectedEvent);

export const getCurrentSelectedEvent = () =>
  createSelector(eventSlice, (state) => state.currentState.selectedEvent);

export const getInitialEvents = () =>
  createSelector(eventSlice, (state) => state.initialState.allEvents);

export const getCurrentEvents = () =>
  createSelector(eventSlice, (state) => state.currentState.allEvents);
