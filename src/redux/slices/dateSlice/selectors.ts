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

export const getInitialGlobalDate = () =>
  createSelector(
    updateDateState,
    (state) => new Date(state.initialState.globalSODate),
  );

export const getInitialDayViewDate = () =>
  createSelector(
    updateDateState,
    (state) => new Date(state.initialState.dayViewISODate),
  );

export const getSelectedGlobalDate = () =>
  createSelector(
    updateDateState,
    (state) => new Date(state.currentState.globalSODate),
  );

export const getSelectedDayViewDate = () =>
  createSelector(
    updateDateState,
    (state) => new Date(state.currentState.dayViewISODate),
  );

export const getInitialIGlobalISODate = () =>
  createSelector(updateDateState, (state) => state.initialState.globalSODate);

export const getInitialIDayViewISODate = () =>
  createSelector(updateDateState, (state) => state.initialState.dayViewISODate);

export const getSelectedGlobalISODate = () =>
  createSelector(updateDateState, (state) => state.currentState.globalSODate);

export const getSelectedDayViewISODate = () =>
  createSelector(updateDateState, (state) => state.currentState.dayViewISODate);

export const getInitialGlobalDay = () =>
  createSelector(updateDateState, (state) =>
    getDay(new Date(state.initialState.globalSODate)),
  );

export const getInitialDayViewDay = () =>
  createSelector(updateDateState, (state) =>
    getDay(new Date(state.initialState.dayViewISODate)),
  );

export const getSelectedGlobalDay = () =>
  createSelector(updateDateState, (state) =>
    getDay(new Date(state.currentState.globalSODate)),
  );

export const getSelectedDayViewDay = () =>
  createSelector(updateDateState, (state) =>
    getDay(new Date(state.currentState.dayViewISODate)),
  );

export const getInitialGlobalMonth = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthIndex(locale, new Date(state.initialState.globalSODate)),
  );

export const getSelectedGlobalMonth = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthIndex(locale, new Date(state.currentState.globalSODate)),
  );

export const getInitialGlobalYear = () =>
  createSelector(updateDateState, (state) =>
    getYear(new Date(state.initialState.globalSODate)),
  );

export const getSelectedGlobalYear = () =>
  createSelector(updateDateState, (state) =>
    getYear(new Date(state.currentState.globalSODate)),
  );

export const getInitialGlobalTimeInMilliseconds = () =>
  createSelector(updateDateState, (state) =>
    getTimeInMilliseconds(new Date(state.initialState.globalSODate)),
  );

export const getSelectedGlobalTimeInMilliseconds = () =>
  createSelector(updateDateState, (state) =>
    getTimeInMilliseconds(new Date(state.currentState.globalSODate)),
  );

export const getInitialGlobalMonthNumberOfDays = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthNumberOfDays(locale, new Date(state.initialState.globalSODate)),
  );

export const getSelectedGlobalMonthNumberOfDays = (locale: LocaleLanguage) =>
  createSelector(updateDateState, (state) =>
    getMonthNumberOfDays(locale, new Date(state.currentState.globalSODate)),
  );

export const getInitialGlobalDayOfWeek = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle,
): ((state: RootState) => DateConfig['dayOfWeek']) =>
  createSelector(updateDateState, (state) =>
    getDayOfWeek(
      locale,
      new Date(state.initialState.globalSODate),
      weekdayStyle,
    ),
  );

export const getSelectedGlobalDayOfWeek = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle,
): ((state: RootState) => DateConfig['dayOfWeek']) =>
  createSelector(updateDateState, (state) =>
    getDayOfWeek(
      locale,
      new Date(state.currentState.globalSODate),
      weekdayStyle,
    ),
  );

export const getInitialGlobalMonthName = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle,
): ((state: RootState) => DateConfig['dayOfWeek']) =>
  createSelector(updateDateState, (state) =>
    getDayOfWeek(
      locale,
      new Date(state.initialState.globalSODate),
      weekdayStyle,
    ),
  );

export const getSelectedGlobalMonthName = (
  locale: LocaleLanguage,
  weekdayStyle?: IntlDateTypeWeekdayStyle,
): ((state: RootState) => DateConfig['dayOfWeek']) =>
  createSelector(updateDateState, (state) =>
    getMonthName(
      locale,
      new Date(state.currentState.globalSODate),
      weekdayStyle,
    ),
  );
