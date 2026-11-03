import assert from "node:assert/strict";
import { makeStore } from "../store/redux-learning/store.js";
import { increment, decrement, reset } from "../store/redux-learning/counter.js";

const store = makeStore();
const initialState = store.getState();
console.log("初始狀態：", initialState);
assert.equal(initialState.counter.value, 0);

for (const [action, expected] of [
  [increment(), 1],
  [increment(), 2],
  [decrement(), 1],
  [reset(), 0],
]) {
  store.dispatch(action);
  console.log(action, "→", store.getState());
  assert.equal(store.getState().counter.value, expected);
}
assert.equal(store.getState().counter.value, 0);

store.dispatch(increment());
assert.equal(store.getState().counter.value, 1);
assert.equal(initialState.counter.value, 0);

const beforeUnknownAction = store.getState();
console.log("未知 action 前狀態：", beforeUnknownAction);
store.dispatch({ type: "UNKNOWN" });
assert.equal(store.getState(), beforeUnknownAction);
assert.equal(makeStore().getState().counter.value, 0);
console.log(
  "makeStore().getState().counter.value",
  makeStore().getState().counter.value,
);

console.log("確認完成：加一、歸零、舊狀態不變、未知 action 與獨立 store。");
