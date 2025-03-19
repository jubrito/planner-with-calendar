import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const updateDateState = (store: RootState) => store.updateDate;

export const getCurrentDate = () =>
  createSelector(updateDateState, (state) => state.currentState.date);

export const getCurrentDay = () =>
  createSelector(updateDateState, (state) => state.currentState.date.getDate());

export const getCurrentMonth = () =>
  createSelector(updateDateState, (state) =>
    state.currentState.date.getMonth()
  );

export const getCurrentYear = () =>
  createSelector(updateDateState, (state) =>
    state.currentState.date.getFullYear()
  );

export const getCurrentTime = () =>
  createSelector(updateDateState, (state) => state.currentState.date.getTime());

export const getCurrentMonthNumberOfDays = () =>
  createSelector(updateDateState, (state) => {
    const year = state.currentState.date.getFullYear();
    const month = state.currentState.date.getMonth() + 1;
    const getLastDayOfMonth = 0;
    return new Date(year, month, getLastDayOfMonth).getDate();
  });
