import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const updateDateState = (store: RootState) => store.dateSlice;

export const getCurrentDate = () =>
  createSelector(updateDateState, (state) => new Date(state.initialState.date));

export const getSelectedDate = () =>
  createSelector(updateDateState, (state) => new Date(state.currentState.date));

export const getSelectedDay = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.currentState.date).getDate()
  );

export const getSelectedMonth = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.currentState.date).getMonth()
  );

export const getSelectedYear = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.currentState.date).getFullYear()
  );

export const getSelectedTime = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.currentState.date).getTime()
  );

export const getSelectedMonthNumberOfDays = () =>
  createSelector(updateDateState, (state) => {
    const currentDate = new Date(state.currentState.date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const getLastDayOfMonth = 0;
    return new Date(year, month, getLastDayOfMonth).getDate();
  });
