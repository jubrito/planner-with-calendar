import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dateReducer from "./slices/dateSlice/index";

const rootReducer = combineReducers({
  dateSlice: dateReducer,
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
