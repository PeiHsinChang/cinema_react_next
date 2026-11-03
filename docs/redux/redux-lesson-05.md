# 第 5 課：跨頁與重新整理

對應 [學習 spec](redux-learning-spec.md)。這課沿用 JavaScript 與第四課的 createSlice，只增加摘要頁與換頁連結。

## 先預測，再操作

執行 `yarn dev`，開啟 http://localhost:3005/redux-learning。先想想：加到 3 後前往另一頁，那一頁會顯示 0 還是 3？

1. 按三次「加一」，確認兩個元件都顯示 3。
2. 按「前往摘要頁」，網址變成 `/redux-learning/summary`，摘要應顯示 3。
3. 按「返回計數器」，兩個元件應仍顯示 3。
4. 再前往摘要頁，完整重新整理瀏覽器，摘要應回到 0；返回計數器也應為 0。
5. 回到計數器加到 3，另開獨立新分頁並輸入摘要頁網址，新分頁應顯示 0。原分頁仍為 3，兩邊的操作不會自動同步。

換頁練習請按頁面上的連結。在網址列輸入網址並送出會完整載入文件，無法用來驗證用戶端換頁保留。

## 為什麼換頁保留？

[首頁](../../pages/redux-learning/index.js) 與 [摘要頁](../../pages/redux-learning/summary.js) 都使用 `next/link`：

```jsx
<Link href="/redux-learning/summary">前往摘要頁</Link>
```

在這兩個 Pages Router 頁面間透過 Link 導覽時，Next.js 更換頁面元件，共用的 `_app` 繼續存在。

[pages/_app.js](../../pages/_app.js) 已在第三課加入：

```jsx
const storeRef = useRef(null);

if (storeRef.current === null) {
  storeRef.current = makeStore();
}
```

同一次應用程式存續期間，ref 裡保留同一份 store，Provider 也繼續提供它。雖然原本的計數器頁面已卸載，數值仍在 store 裡。

摘要頁重用 CounterSummary，由它的 `useSelector` 讀取 `state.counter.value`。不需要把數值放進網址，也沒有另外複製一份 state。

```text
計數器頁 dispatch → store 的值變成 3
→ Link 換頁，_app 保留同一份 store
→ 摘要頁 useSelector 讀到 3
```

## 為什麼重新整理回到 0？

完整重新整理會重新載入應用程式，原本記憶體中的 store 不會被保存。新的 store 使用 counter 的初始值 `{ value: 0 }`。

| 操作 | store 的情況 | 預期數值 |
| --- | --- | --- |
| 加到 3 後用頁面 Link 換頁 | 繼續使用同一份 | 3 |
| 完整重新整理 | 重新建立 | 0 |
| 獨立新分頁直接載入網址 | 另外建立 | 0 |

目前沒有 localStorage 或跨分頁同步機制。跨頁共用資料與重新載入後保存資料，是兩個不同的需求。

## 理解題

1. 計數器頁面卸載後，為什麼摘要頁還能讀到 3？
2. Provider 若分別放在兩個頁面內，每次進頁面都建立 store，還能保留剛才的數值嗎？
3. 「跨頁保留」和「重新整理保留」是不是同一件事？請用今天的操作說明。

進度：已提供摘要頁與操作步驟；待學習者實際驗證及回覆理解題，尚未宣告本課驗收完成。下一課才處理 SSR 初始狀態交接。
