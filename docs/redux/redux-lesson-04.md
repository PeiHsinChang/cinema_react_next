# 第 4 課：使用 createSlice

對應 [學習 spec](redux-learning-spec.md)。本課維持加一、減一、歸零與兩個元件共用資料的行為，改寫 reducer 與發送 action 的方式。

## 為什麼要改？

以前要自己寫事件字串、switch 分支和更新物件的程式。createSlice 把同一主題的初始狀態、更新規則與 action creators 放在一起，減少重複工作和拼錯事件名稱的機會。

Slice 是 store 裡的一個資料區域，不是另一份 store。目前只有 counter 這個區域，store.js 仍負責組合它。

## 先讀 counter.js

開啟 [counter.js](../../store/redux-learning/counter.js)：

```js
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
  },
});
```

- name：用來產生事件名稱，例如 counter/increment。
- initialState：這個資料區的初始值。
- reducers：每個事件要如何更新資料。

完整程式也有 decrement 與 reset。沒有列出的事件會保留原狀態，不需要再寫 default。

注意：name 不是決定 getState 路徑的開關。`state.counter.value` 的 counter 來自 store.js 的 `reducer: { counter: counterReducer }`。這裡兩者刻意使用相同名稱，方便理解。

## 為什麼能直接寫 state.value += 1？

第二課手寫 reducer 要建立新物件：

```js
return { ...state, value: state.value + 1 };
```

在 createSlice 的 reducer 裡，可以寫：

```js
state.value += 1;
```

因為 Redux Toolkit 內建 Immer，這裡的 state 是可供修改的 draft，Immer 會根據修改產生新狀態，保留原始狀態不變。

這不是允許你在元件裡直接修改 store 的資料，也不代表一般手寫 reducer 都能這樣做。reducer 仍不呼叫 API、不操作畫面。本課每個 reducer 只修改 draft，不同時回傳另一個新物件。

## increment() 不是直接加一

createSlice 同時幫我們產生 action creators：

```js
export const { increment, decrement, reset } = counterSlice.actions;
```

increment 是「建立 action 物件」的函式。呼叫 increment() 會得到包含以下 type 的物件：

```js
{ type: "counter/increment" }
```

自動產生的物件也可能包含值為 undefined 的 payload；不影響本課。

只呼叫 increment() 不會修改 store，還要送出去：

```js
dispatch(increment());
```

對照以前：

```js
dispatch({ type: "INCREMENT" });
```

事件名稱已改變，不能期待舊 INCREMENT 字串繼續加一。元件與終端機示範已一起更新。

本課的 actions 不需要 payload。若未來要「增加指定數量」，才在 action 帶數字並由 reducer 讀取 action.payload；這次先不增加功能。

最後 `export default counterSlice.reducer` 把整合好的 reducer 交給原本的 store.js，因此 store 與 selector 路徑不需要改。

## 動手驗證

1. 開啟 http://localhost:3005/redux-learning，兩個元件初始都為 0。
2. 加兩次、減一次，都為 1；歸零都為 0；0 減一可得到 -1。
3. 在專案根目錄執行 `node --experimental-default-type=module scripts/redux-lesson-04.mjs`，觀察 action 變成 counter/increment 等名稱。
4. 腳本同時檢查原始 state 不變、未知 action 不改狀態與 store 隔離。
5. 如已安裝 Redux DevTools，可在事件紀錄中找到 counter/increment；未安裝也可用腳本觀察。

第四課使用 [redux-lesson-04.mjs](../../scripts/redux-lesson-04.mjs)，匯入網站目前的 createSlice 與 store。第二課另保留 counter-lesson02.js 與 redux-lesson-02.mjs，僅供終端機練習；網站 Counter 元件仍使用第四課版本。

## 理解題

1. increment() 與 dispatch(increment()) 差在哪裡？哪一個才會讓 store 更新？
2. 為什麼 createSlice 的 reducer 可以寫 state.value += 1，卻不能在元件裡直接修改 Redux state？
3. Slice 是另一份 store 嗎？

進度：已提供改寫範例，待操作與理解題回覆。本課完成後，先把熟悉的教學範例轉成 TypeScript，再進跨頁與 SSR。

參考：[createSlice](https://redux-toolkit.js.org/api/createSlice)、[Immer reducers](https://redux-toolkit.js.org/usage/immer-reducers)。
