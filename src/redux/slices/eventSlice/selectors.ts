import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const eventSlice = (state: RootState) => state.eventSlice;

export const getInitialEvent = () =>
  createSelector(eventSlice, (state) => state.initialState.event);
