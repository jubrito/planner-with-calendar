import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultLocale } from "../../../utils/locale/constants";
import { deepCopy } from "../../../utils/utils";
import { LocaleLanguage } from "../../../types/locale/types";

type InitialLocaleState = {
  locale: { lang: LocaleLanguage };
};

type InitialState = {
  initialState: InitialLocaleState;
  currentState: InitialLocaleState;
};

const initialLocale: InitialLocaleState = {
  locale: {
    lang: defaultLocale,
  },
};

const initialValue: InitialState = {
  initialState: deepCopy(initialLocale),
  currentState: deepCopy(initialLocale),
};

export const localeSlice = createSlice({
  name: "localeSlice",
  initialState: initialValue,
  reducers: {
    updateLocale(state, action: PayloadAction<LocaleLanguage>) {
      state.currentState.locale.lang = action.payload;
    },
  },
});

export const { updateLocale } = localeSlice.actions;

export default localeSlice.reducer;
