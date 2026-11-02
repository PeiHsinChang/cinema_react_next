# 第 1 課：useState 計數器

對應 [學習 spec](redux-learning-spec.md)。本課先用 JavaScript，熟悉 React 與 Redux 整合後再導入 TypeScript。

## 本課目標

理解「狀態改變 → React 再次執行元件 → 畫面顯示新值」。先觀察元件自己的狀態，下一課才開始建立 Redux store。

## 開啟練習

在專案根目錄執行 `yarn dev`，開啟 http://localhost:3005/redux-learning。

程式在 [pages/redux-learning/index.js](../../pages/redux-learning/index.js)。

## 三個重點

### 1. 準備自己的筆記本

`const [count, setCount] = useState(0)`：

- count：這次畫面拿到的數值。
- setCount：告訴 React 要更新數值的方法。
- 0：元件第一次建立時的初始值。

這份資料屬於這個元件，目前沒有 Redux、store 或 Provider。

### 2. 按按鈕後更新狀態

`setCount((previous) => previous + 1)` 表示「拿待處理的前一個值，加一」。previous 只是參數名稱，不是 React 的特殊關鍵字。

因為新值依賴前一個值，所以使用這個函式寫法。歸零不需要計算，直接 `setCount(0)` 即可。

不要直接寫 `count = count + 1`；本例 count 是 const，而且一般變數賦值也不會通知 React 更新畫面。

### 3. 讓畫面讀取狀態

JSX 裡的 `{count}` 會顯示這次 render 的數值。呼叫 setCount 是排程更新，不是立即改寫目前函式裡的 count；React 處理更新後，再執行元件並更新畫面。

```text
按「加一」 → setCount → React 處理新狀態 → 元件再次執行 → 顯示新 count
```

## 動手操作

1. 預測：初次開啟會顯示多少？
2. 按兩次加一，再按一次減一，確認得到 1。
3. 按歸零，確認得到 0。
4. 在 0 按減一，確認得到 -1；這個練習沒有禁止負數。
5. 加到 3，完整重新整理瀏覽器，確認回到 0。

重新整理會重新建立元件，目前沒有儲存機制。開發時存檔的 Fast Refresh 不等於完整重新整理，可能保留狀態。

## 理解題與進度

- count 和 setCount 各自負責什麼？
- 為什麼歸零不需要 previous？
- 加到 3 之後重新整理，為什麼變回 0？

目前已提供練習程式；待學習者完成操作並回覆理解題後，再記錄本課完成，進入下一課。
