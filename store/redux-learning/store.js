import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data.js";
import counterReducer from "./counter.js";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      counter: counterReducer,
      data: dataReducer,
    },
    preloadedState,
  });
}
