import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dateReducer from "./slices/dateSlice";
import localeReducer from "./slices/localeSlice";

const rootReducer = combineReducers({
  dateSlice: dateReducer,
  localeSlice: localeReducer,
});

const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default setupStore;
