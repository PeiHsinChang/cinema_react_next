import assert from "node:assert/strict";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/redux-learning/counter-lesson02.js";

function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
}

const store = makeStore();
const initialState = store.getState();
console.log("初始狀態：", initialState);
assert.equal(initialState.counter.value, 0);

for (const [type, expected] of [
  ["INCREMENT", 1],
  ["INCREMENT", 2],
  ["DECREMENT", 1],
  ["RESET", 0],
]) {
  store.dispatch({ type });
  console.log(type, "→", store.getState());
  assert.equal(store.getState().counter.value, expected);
}

store.dispatch({ type: "INCREMENT" });
assert.equal(store.getState().counter.value, 1);
assert.equal(initialState.counter.value, 0);

const beforeUnknownAction = store.getState();
store.dispatch({ type: "UNKNOWN" });
assert.equal(store.getState(), beforeUnknownAction);
assert.equal(makeStore().getState().counter.value, 0);

console.log("確認完成：加減、歸零、舊狀態不變、未知 action 與獨立 store。");
