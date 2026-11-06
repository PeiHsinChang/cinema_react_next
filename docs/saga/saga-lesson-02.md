# 第 2 課：讓 action 觸發 Saga

本課只執行 [獨立腳本](../../scripts/saga/lesson-02.mjs)，不接 API 或網站，不修改既有 Redux 頁面。

## 一個主要觀念

Saga middleware 接在 Redux store 的 dispatch 流程中。啟動 watcher 後，它能監聽指定 action，執行對應工作。Saga 不是另一份 store；reducer 仍負責更新狀態。

本課使用 takeEvery：每次收到符合 type 的 action，就啟動一次 worker。先不討論並行或取消請求。

```js
function* watchLesson() {
  yield takeEvery(lessonRequested.type, handleLesson)
}
```

- createSagaMiddleware()：建立 middleware 實例。
- configureStore 的 middleware：將實例接到這份 store。
- sagaMiddleware.run(watchLesson)：啟動 watcher，由 middleware 推進 generator，不必手動 next()。
- handleLesson(action)：worker 接收完整 action；本課只印出 payload。
- task.cancel()：停止 watcher；本課 worker 是同步的，不含未完成的 API 請求。

這次 reducer 原樣回傳 state，因此 worker 印出訊息後，store 資料仍保持原樣。received 陣列僅用於腳本驗證接收次數，不是另一份 Redux store。

## 先預測，再操作

先看腳本，預測哪幾個 dispatch 會印出「Saga 收到」：

1. watcher 尚未啟動前，發出相符 action。
2. 啟動後，發出不相符 action。
3. 啟動後，兩次發出相符 action。
4. 停止後，再發出相符 action。

```sh
node scripts/saga/lesson-02.mjs
```

腳本包含斷言，驗證只有啟動期間相符的兩次 action 被接收，狀態不變且任務可停止。可以修改相符 action 的 payload，再執行觀察訊息。

## 理解題

1. middleware 接到 store 後，為什麼還需要呼叫 run？
2. Saga 印出 payload，是否代表 store 狀態一定改變？誰負責更新狀態？

## 版本與進度

2026-11-05 從 npm registry 查得 redux-saga 1.5.1，metadata 未宣告 engines 或 peerDependencies。以 yarn 安裝，yarn.lock 解析 redux-saga 與 @redux-saga/core 均為 1.5.1。教學者執行腳本成功：只接收啟動期間兩次相符 action，停止後不再接收，store 狀態保持原樣。網站未接入 middleware，未執行網站 lint/build。

學習者尚待預測、操作與回答；本課未完成。不提前進入 call、put 或網站實作。

參考：[Saga 官方 takeEvery 說明](https://redux-saga.js.org/docs/basics/UsingSagaHelpers/)。
