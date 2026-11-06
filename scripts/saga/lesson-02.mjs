import assert from "node:assert/strict";
import { configureStore, createAction } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { takeEvery } from "redux-saga/effects";

const lessonRequested = createAction("sagaLesson/requested");
const unrelatedAction = createAction("other/requested");
const received = [];

function* handleLesson(action) {
  received.push(action.payload);
  console.log("Saga 收到：", action.payload);
}

function* watchLesson() {
  yield takeEvery(lessonRequested.type, handleLesson);
}

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: (state = { label: "第 2 課" }) => state,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

console.log("1. 尚未啟動 watcher");
store.dispatch(lessonRequested("啟動前的 action"));
assert.equal(received.length, 0);

const task = sagaMiddleware.run(watchLesson);
try {
  console.log("2. 不相符的 action");
  store.dispatch(unrelatedAction());
  assert.equal(received.length, 0);

  console.log("3. 相符的 action");
  store.dispatch(lessonRequested("開始學 middleware"));
  assert.deepEqual(received, ["開始學 middleware"]);

  console.log("4. 再 dispatch 一次，每次各觸發一次");
  store.dispatch(lessonRequested("再練習一次"));
  assert.deepEqual(received, ["開始學 middleware", "再練習一次"]);
  assert.deepEqual(store.getState(), { label: "第 2 課" });
} finally {
  console.log("6. 停止 watcher");
  task.cancel();
  await task.toPromise();
}

console.log("5. 停止 watcher 後，不再接收");
store.dispatch(lessonRequested("停止後的 action"));
assert.equal(received.length, 2);
assert.equal(task.isRunning(), false);
console.log("驗證通過；store 狀態：", store.getState());
