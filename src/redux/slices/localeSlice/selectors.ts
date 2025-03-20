import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const updateLocaleState = (state: RootState) => state.localeSlice;

export const getLocaleLanguage = () =>
  createSelector(updateLocaleState, (state) => state.currentState.locale.lang);
