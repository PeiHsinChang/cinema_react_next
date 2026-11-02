# 第 2 課：先看 Redux 本身

對應 [學習 spec](redux-learning-spec.md)。本課用 JavaScript，先不接 React 畫面。第 1 課的 useState 計數器仍然可以操作。

## 執行方式

在專案根目錄執行：

```bash
node --experimental-default-type=module scripts/redux-lesson-02.mjs
```

這個指令只為了讓 Node 直接讀取練習用的 ES module `.js` 檔案，不改整個專案的 module 設定。使用目前開發環境的 Node 22 執行。

預期先看到 0 → 1 → 2 → 1 → 0 的狀態紀錄，接著是檢查完成訊息。這些紀錄顯示在終端機，不是瀏覽器。

## 先讀 reducer：更新規則

開啟 [counter.js](../../store/redux-learning/counter.js)。

`state = initialState` 表示第一次沒有提供狀態時，使用 `{ value: 0 }`。

`switch (action.type)` 是依照事件名稱選規則：INCREMENT 加一、DECREMENT 減一、RESET 歸零。這些字串是我們取的名字，不是 Redux 保留字。

`return { ...state, value: state.value + 1 }` 表示建立新物件，保留原本欄位，再把 value 換成加一後的數字。手寫 reducer 不直接修改傳進來的舊物件。

不認識的事件走 `default`，回傳原來的 state。Reducer 只計算，不呼叫 API、不操作畫面。

## 再讀 store：保存狀態

開啟 [store.js](../../store/redux-learning/store.js)。

`configureStore` 幫忙建立 Redux store。`reducer: { counter: counterReducer }` 把 counterReducer 放在 counter 這個位置，所以完整狀態是：

```json
{ "counter": { "value": 0 } }
```

讀值要用 `store.getState().counter.value`。這裡 counterReducer 收到的是 `{ value: 0 }`，不是整個根狀態。

`makeStore()` 每呼叫一次就建立一份獨立 store。目前沒有在模組頂層建立全站共用的 store，後面學 SSR 時也會用到這個分工。

## 最後讀示範：送出事件

開啟 [redux-lesson-02.mjs](../../scripts/redux-lesson-02.mjs)。

```js
const store = makeStore();
store.dispatch({ type: "INCREMENT" });
console.log(store.getState());
```

- makeStore：準備一份 store。
- dispatch：送出「加一」action。
- getState：讀取目前的完整狀態。

這個普通 action 的 reducer 會同步算完，所以 dispatch 下一行就能讀到新值。不要把這點直接套用到未來的 API 非同步請求。

程式後半的 assert 是自動檢查：條件不成立就報錯，成立就繼續。除了顯示結果，也確認舊狀態沒有被修改，未知 action 不改狀態，另一個新 store 不受影響。

## 與第一課比較

第一課：按鈕 → setCount → React 狀態更新 → 畫面更新。

第二課：dispatch → reducer → store 狀態更新。還沒有訂閱這份 store 的 React 元件，所以網頁上的 count 不會跟著這個腳本改變。

本課只安裝 Redux Toolkit，React Redux 留到下一課需要 Provider 與 hooks 時再加入。

## 理解題

1. `store.dispatch({ type: "INCREMENT" })` 裡，哪一段是 action？
2. 為什麼要讀 `counter.value`，不是直接讀 `value`？
3. 如果送出 `{ type: "UNKNOWN" }`，目前數值會變嗎？為什麼？

進度：已通過腳本檢查。已討論 action 是整個物件、getState 回傳資料而非 reducers，以及 UNKNOWN 會保留原值；學習者表示理解，進入第 3 課。

參考：[configureStore](https://redux.js.org/toolkit/api/configureStore)、[Store API](https://redux.js.org/api/store)。
