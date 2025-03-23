import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { LocaleLanguage } from "../../../types/locale/types";
import { DateConfig } from "../../../types/calendar/types";

const updateDateState = (store: RootState) => store.dateSlice;

export const getInitialDate = () =>
  createSelector(updateDateState, (state) => new Date(state.initialState.date));

export const getSelectedDate = () =>
  createSelector(updateDateState, (state) => new Date(state.currentState.date));

export const getCurrentDay = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.initialState.date).getDate()
  );

export const getSelectedDay = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.currentState.date).getDate()
  );

export const getCurrentMonth = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.initialState.date).getMonth()
  );

export const getSelectedMonth = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.currentState.date).getMonth()
  );

export const getCurrentYear = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.initialState.date).getFullYear()
  );

export const getSelectedYear = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.currentState.date).getFullYear()
  );

export const getCurrentTime = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.initialState.date).getTime()
  );

export const getSelectedTime = () =>
  createSelector(updateDateState, (state) =>
    new Date(state.currentState.date).getTime()
  );

export const getCurrentMonthNumberOfDays = () =>
  createSelector(updateDateState, (state) => {
    const currentDate = new Date(state.initialState.date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const getLastDayOfMonth = 0;
    return new Date(year, month, getLastDayOfMonth).getDate();
  });

export const getSelectedMonthNumberOfDays = () =>
  createSelector(updateDateState, (state) => {
    const currentDate = new Date(state.currentState.date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const getLastDayOfMonth = 0;
    return new Date(year, month, getLastDayOfMonth).getDate();
  });

export const getInitialDayOfWeek = (
  locale: LocaleLanguage
): ((state: RootState) => DateConfig["dayOfWeek"]) =>
  createSelector(updateDateState, (state) => ({
    long: new Intl.DateTimeFormat(locale, {
      weekday: "long",
    }).format(new Date(state.initialState.date)),
    short: new Intl.DateTimeFormat(locale, {
      weekday: "short",
    }).format(new Date(state.initialState.date)),
  }));

export const getSelectedDayOfWeek = (
  locale: LocaleLanguage
): ((state: RootState) => DateConfig["dayOfWeek"]) =>
  createSelector(updateDateState, (state) => ({
    long: new Intl.DateTimeFormat(locale, {
      weekday: "long",
    }).format(new Date(state.initialState.date)),
    short: new Intl.DateTimeFormat(locale, {
      weekday: "short",
    }).format(new Date(state.initialState.date)),
  }));
