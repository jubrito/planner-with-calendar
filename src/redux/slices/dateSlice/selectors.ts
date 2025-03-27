import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { LocaleLanguage } from '../../../types/locale/types';
import {
  DateConfig,
  IntlDateTypeWeekdayStyle,
} from '../../../types/calendar/types';
import {
  getDayOfWeek,
  getMonthIndex,
  getMonthName,
  getMonthNumberOfDays,
  getTimeInMilliseconds,
  getYear,
} from '../../../utils/calendar/utils';
import { getDay } from '../../../utils/calendar/utils';

const updateDateState = (store: RootState) => store.dateSlice;

export const getInitialDate = () =>
  createSelector(
    updateDateState,
    (state) => new Date(state.initialState.dateISO),
  );

export const getSelectedDate = () =>
  createSelector(
    updateDateState,
    (state) => new Date(state.currentState.dateISO),
  );

export const getSelectedISODate = () =>
  createSelector(updateDateState, (state) => state.currentState.dateISO);

export const getInitialDay = () =>
  createSelector(updateDateState, (state) =>
    getDay(new Date(state.initialState.dateISO)),
  );

export const getSelectedDay = () =>
  createSelector(updateDateState, (state) =>
    getDay(new Date(state.currentState.dateISO)),
  );

export const getInitialMonth = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthIndex(locale, new Date(state.initialState.dateISO)),
  );

export const getSelectedMonth = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthIndex(locale, new Date(state.currentState.dateISO)),
  );

export const getInitialYear = () =>
  createSelector(updateDateState, (state) =>
    getYear(new Date(state.initialState.dateISO)),
  );

export const getSelectedYear = () =>
  createSelector(updateDateState, (state) =>
    getYear(new Date(state.currentState.dateISO)),
  );

export const getInitialTimeInMilliseconds = () =>
  createSelector(updateDateState, (state) =>
    getTimeInMilliseconds(new Date(state.initialState.dateISO)),
  );

export const getSelectedTimeInMilliseconds = () =>
  createSelector(updateDateState, (state) =>
    getTimeInMilliseconds(new Date(state.currentState.dateISO)),
  );

export const getInitialMonthNumberOfDays = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthNumberOfDays(locale, new Date(state.initialState.dateISO)),
  );

export const getSelectedMonthNumberOfDays = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthNumberOfDays(locale, new Date(state.currentState.dateISO)),
  );

export const getInitialDayOfWeek = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle,
): ((state: RootState) => DateConfig['dayOfWeek']) =>
  createSelector(updateDateState, (state) =>
    getDayOfWeek(locale, new Date(state.initialState.dateISO), weekdayStyle),
  );

export const getSelectedDayOfWeek = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle,
): ((state: RootState) => DateConfig['dayOfWeek']) =>
  createSelector(updateDateState, (state) =>
    getDayOfWeek(locale, new Date(state.currentState.dateISO), weekdayStyle),
  );

export const getInitialMonthName = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle,
): ((state: RootState) => DateConfig['dayOfWeek']) =>
  createSelector(updateDateState, (state) =>
    getDayOfWeek(locale, new Date(state.initialState.dateISO), weekdayStyle),
  );

export const getSelectedMonthName = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle,
): ((state: RootState) => DateConfig['dayOfWeek']) =>
  createSelector(updateDateState, (state) =>
    getMonthName(locale, new Date(state.currentState.dateISO), weekdayStyle),
  );
