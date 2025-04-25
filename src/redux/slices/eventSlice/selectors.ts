import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const eventSlice = (state: RootState) => state.eventSlice;

export const getInitialEvents = () =>
  createSelector(eventSlice, (state) => state.initialState.events);

export const getCurrentEvents = () =>
  createSelector(eventSlice, (state) => state.currentState.events);
