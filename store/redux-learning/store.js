import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.js";

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
}
