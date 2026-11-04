# 第 6 課：SSR 初始狀態交接

對應 [學習 spec](redux-learning-spec.md)。先用固定資料 A/B，這課不抓 API，沿用 JavaScript。

## 先預測

首頁計數加到 3，再按「換成固定資料 B」，資料應變成 B；計數應是 0 還是 3？

## 依序讀三個位置

1. [ssr.js](../../store/redux-learning/ssr.js)：首頁匯出的 getServerSideProps 在伺服器執行。每次請求呼叫 makeStore，dispatch 固定資料，再把 getState() 快照放進 props.initialReduxState。sample=b 選擇 B，其餘使用 A。這是可控制的教學資料，不是 API 回應。
2. [store.js](../../store/redux-learning/store.js)：makeStore(preloadedState) 可用快照建立 store。狀態分成 counter.value 與 data（items、status、error）。
3. [pages/_app.js](../../pages/_app.js)：第一次建立 store 時傳入 initialReduxState。伺服器產生 HTML 和瀏覽器第一次 render 使用相同資料，避免 hydration mismatch。

```text
請求首頁
→ getServerSideProps 建立當次請求的 store
→ dispatch 固定資料 A
→ getState() 產生快照
→ Next.js 傳遞 HTML 與可序列化 props
→ 瀏覽器以快照建立自己的 store
```

伺服器 store 和瀏覽器 store 是兩個 JavaScript 物件，傳過去的是資料快照，不是物件參考。不能在模組頂層建立所有請求共用的可變 store，否則可能讓不同使用者的資料混在一起。

## Link 換頁時怎麼辦？

第五課的 useRef 會保留瀏覽器 store，所以再傳入 preloadedState 不會重新初始化它。必須另外處理新的 SSR props。

本課在 _app 的 effect 中 dispatch hydrateData(snapshot.data)。這個 action 只替換 data，不會覆蓋 counter。appliedSnapshot 記錄已套用的 props 快照，換頁等待 effect 時短暫顯示「正在套用伺服器資料…」，避免新頁面讀到上一頁的 data；首次 SSR 和 hydration 不需要等待這個 effect。

沒有 initialReduxState 的頁面（例如摘要頁）不會清空 store。因此 Link 進摘要頁仍會看到先前的資料；直接載入或重新整理摘要頁則是 0 與「尚無資料」，因為摘要頁沒有 getServerSideProps。

這是為了理解交接而手動實作的流程。Redux 官方的 Pages Router 整合路線使用 next-redux-wrapper；本課不混入另一套 HYDRATE 機制。

## 操作驗證

執行 yarn dev，開啟 http://localhost:3005/redux-learning。

1. 首次載入：counter 為 0，資料為 A，狀態 succeeded。
2. 用瀏覽器「檢視網頁原始碼」搜尋「SSR 固定資料 A」，應能在頁面內容中看到，不是等瀏覽器再抓一次資料。
3. 加到 3，按「換成固定資料 B」：counter 仍為 3，資料變 B。
4. 前往摘要頁：仍為 3 與 B；返回首頁重新取得 A，counter 仍為 3。
5. 在首頁完整重新整理：counter 回到 0，資料由目前 URL 決定是 A 或 B。
6. 在摘要頁完整重新整理：counter 為 0，顯示尚無資料。
7. 檢查瀏覽器 console，確認沒有 hydration mismatch。

終端機驗證：

```sh
node --experimental-default-type=module scripts/redux-lesson-06.mjs
```

腳本檢查獨立請求 A/B 不互相污染、快照可序列化、初始狀態相同，以及套用新 data 不覆蓋 counter。它不代替瀏覽器導覽與 hydration 檢查。

## 理解題

1. 伺服器 store 和瀏覽器 store 是同一個 JavaScript 物件嗎？實際傳過去的是什麼？
2. 為什麼每個伺服器請求都要建立自己的 store？
3. 換成 B 時，為什麼不能直接把整份 SSR state 蓋到瀏覽器 store？

進度：已提供程式與練習，瀏覽器操作及理解題待學習者驗證。本課先停在這裡，下一課才接 TBN API。

參考：[Redux SSR](https://redux.js.org/usage/server-rendering)、[Redux Next.js 整合](https://redux.js.org/usage/nextjs)。

實作檢查：第 4、6 課腳本通過；變更的 JavaScript 檔案 lint 通過。yarn build 編譯成功，但仍被既有 /reCAPTCHA 頁面的 RECAPTCHA_KEY 為 undefined 阻擋。尚未執行瀏覽器 hydration 與 Link 導覽驗證。
