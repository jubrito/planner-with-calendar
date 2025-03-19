import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const updateDateState = (store: RootState) => store.updateDate;

export const getDate = () =>
  createSelector(updateDateState, (state) => state.currentState.date);

export const getDay = () =>
  createSelector(updateDateState, (state) => state.currentState.date.getDate());

export const getMonth = () =>
  createSelector(updateDateState, (state) =>
    state.currentState.date.getMonth()
  );

export const getYear = () =>
  createSelector(updateDateState, (state) =>
    state.currentState.date.getFullYear()
  );
