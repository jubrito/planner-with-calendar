import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const updateDateSlice = (store: RootState) => store.updateDate;

export const getDate = () =>
  createSelector(updateDateSlice, (state) => state.currentState.date);
