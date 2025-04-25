import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const eventSlice = (state: RootState) => state.eventSlice;

export const getInitialEvent = () =>
  createSelector(eventSlice, (state) => state.initialState.event);

export const getCurrentEvent = () =>
  createSelector(eventSlice, (state) => state.currentState.event);

export const getInitialEvents = () =>
  createSelector(eventSlice, (state) => state.initialState.allEvents);

export const getCurrentEvents = () =>
  createSelector(eventSlice, (state) => state.currentState.allEvents);
