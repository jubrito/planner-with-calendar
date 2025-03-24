import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { LocaleLanguage } from "../../../types/locale/types";
import { DateConfig } from "../../../types/calendar/types";
import {
  getDate,
  getMonth,
  getTimeInMilliseconds,
  getYear,
} from "../../../utils/calendar/utils";
import { getDay } from "../../../utils/calendar/utils";

const updateDateState = (store: RootState) => store.dateSlice;

export const getInitialDate = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getDate(locale, new Date(state.initialState.date))
  );

export const getSelectedDate = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getDate(locale, new Date(state.currentState.date))
  );

export const getInitialDay = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getDay(locale, new Date(state.initialState.date))
  );

export const getSelectedDay = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getDay(locale, new Date(state.currentState.date))
  );

export const getInitialMonth = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonth(locale, new Date(state.initialState.date))
  );

export const getSelectedMonth = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonth(locale, new Date(state.currentState.date))
  );

export const getInitialYear = () =>
  createSelector(updateDateState, (state) =>
    getYear(new Date(state.initialState.date))
  );

export const getSelectedYear = () =>
  createSelector(updateDateState, (state) =>
    getYear(new Date(state.currentState.date))
  );

export const getInitialTime = () =>
  createSelector(updateDateState, (state) =>
    getTimeInMilliseconds(new Date(state.currentState.date))
  );

export const getSelectedTime = () =>
  createSelector(updateDateState, (state) =>
    getTimeInMilliseconds(new Date(state.currentState.date))
  );

export const getInitialMonthNumberOfDays = () =>
  createSelector(updateDateState, (state) => {
    const currentDate = new Date(state.initialState.date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const getLastDayOfMonth = 0;
    return new Date(year, month, getLastDayOfMonth).getDate();
  });

export const getInitialMonthNumberOfDays2 = () =>
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
