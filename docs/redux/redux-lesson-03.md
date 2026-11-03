# 第 3 課：把 Redux 接到 React

對應 [學習 spec](redux-learning-spec.md)。本課仍用 JavaScript，沿用第二課的 store 與手寫 reducer。

## 開啟練習

執行 `yarn dev`，打開 http://localhost:3005/redux-learning。畫面有計數器和結果摘要，兩個元件各自讀取同一份 Redux 狀態，沒有把 count 從父元件傳下去。

第一課的計數器已在同一路由改為 Redux；舊 useState 寫法仍可參考第一課筆記。

## 依序閱讀三個角色

### 1. Provider：讓元件找到 store

在 [pages/_app.js](../../pages/_app.js) 提供 store：

```jsx
<Provider store={storeRef.current}>
  <Component {...pageProps} />
</Provider>
```

這裡是 Pages Router 的共用入口；它提供的 store 可供裡面的頁面與元件使用。保留原本的全域樣式與 Head。

`useRef(null)` 像一個在元件存續期間保留物品的盒子，盒子裡的內容叫 `.current`。只有盒子是空的時候才呼叫 makeStore，讓重新 render 時繼續用同一份 store。ref 本身改變不會觸發畫面更新；後面的 useSelector 才負責訂閱狀態。

如果每次 render 都直接 makeStore，可能把狀態重新變回初始值。也不能在模組頂層建立可變的伺服器共用 store；此處隨每次伺服器 render 建立獨立實例。API 與 SSR 初始資料交接留到後面的課程。

### 2. useSelector：讀取並關注需要的資料

在 [Counter.js](../../components/redux-learning/Counter.js)：

```js
const count = useSelector((state) => state.counter.value);
```

state 是完整狀態；這個函式挑出 counter.value。這個值變了，元件就會更新。第二課的 getState 只是當下讀一次；useSelector 還會幫 React 訂閱後續變化。

[CounterSummary.js](../../components/redux-learning/CounterSummary.js) 也使用相同 selector，所以它會一起顯示新值。不是兩份數值互相同步，而是兩個元件讀同一份資料。

### 3. useDispatch：送出事件

```js
const dispatch = useDispatch();

function handleIncrement() {
  dispatch({ type: "INCREMENT" });
}
```

useDispatch 取得這份 store 的 dispatch。按按鈕才執行 handleIncrement，送出 action，再由第二課的 reducer 計算。函式取名 handleIncrement 是為了好讀，不是 Redux 的特殊規則。

本課移除計數器的 useState，沒有另外複製 Redux 數值，也沒有在 render 中 dispatch。

## 完整流程

```text
按「加一」
→ handleIncrement
→ dispatch({ type: "INCREMENT" })
→ counterReducer 算出新的 value
→ store 保存新狀態
→ 兩個元件的 useSelector 讀到新值
→ 兩個地方一起更新
```

Provider 提供管道、useDispatch 送事件、useSelector 讀取並訂閱資料。計算規則仍放在 reducer。

## 操作與理解題

1. 初次完整載入，兩處都是 0。
2. 加兩次，再減一次，兩處都顯示 1。
3. 歸零，兩處都顯示 0。
4. 加到 3，再完整重新整理，兩處回到 0。Redux 仍沒有永久儲存功能。

理解題：

- CounterSummary 沒有收到 count props，為什麼仍然能顯示數值？
- 如果只用 getState 讀值，是否已經讓 React 訂閱後續更新？
- 按加一後，負責計算新值的是 onClick、Provider，還是 reducer？

進度：學習者已正確說明 useSelector 讀取資料、getState 不自動訂閱畫面更新，以及 reducer 負責計算新值。進入第 4 課 createSlice；接著加入 TypeScript，再處理跨頁與 SSR。此文保留第三課寫法，第四課起事件改為 createSlice 產生的名稱。

參考：[React Redux hooks](https://redux.js.org/react-redux/api/hooks)、[Provider](https://redux.js.org/react-redux/api/provider)。
