import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { LocaleLanguage } from "../../../types/locale/types";
import {
  DateConfig,
  IntlDateTypeWeekdayStyle,
} from "../../../types/calendar/types";
import {
  getDate,
  getDayOfWeek,
  getMonthIndex,
  getMonthNumberOfDays,
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
    getMonthIndex(locale, new Date(state.initialState.date))
  );

export const getSelectedMonth = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthIndex(locale, new Date(state.currentState.date))
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

export const getInitialMonthNumberOfDays = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthNumberOfDays(locale, new Date(state.initialState.date))
  );

export const getSelectedMonthNumberOfDays = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthNumberOfDays(locale, new Date(state.currentState.date))
  );

export const getInitialDayOfWeek = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle
): ((
  state: RootState
) => DateConfig["dayOfWeek"]["long"] | DateConfig["dayOfWeek"]["short"]) =>
  createSelector(updateDateState, (state) =>
    getDayOfWeek(locale, new Date(state.initialState.date), weekdayStyle)
  );

export const getSelectedDayOfWeek = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle
): ((
  state: RootState
) => DateConfig["dayOfWeek"]["long"] | DateConfig["dayOfWeek"]["short"]) =>
  createSelector(updateDateState, (state) =>
    getDayOfWeek(locale, new Date(state.currentState.date), weekdayStyle)
  );
