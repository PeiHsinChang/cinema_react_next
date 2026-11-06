# Saga 獨立課程：逐步學習 Spec

日期：2026-11-04。狀態：進入第 2 課 middleware 練習；已安裝 redux-saga 1.5.1，尚未接入網站搜尋。

## 目標與方式

這是一套獨立的 Saga 課程，有自己的第 0～7 課、筆記與驗收進度，文件集中在 docs/saga/。Redux 課程維持原本的第 0～7 課，不把 Saga 納入其完成條件。

先備知識是 Redux 的 action、dispatch、reducer、store，以及基本的 async/await。實作起點沿用專案現有的 TBN 分類搜尋，使用 JavaScript、Next.js Pages Router、Redux Toolkit 與 yarn。課程使用獨立的 /saga-learning 路由、元件與 store，保留既有 /redux-learning 的實作。第 4 課才建立網站頁面。

每次只進行一課：說明一個主要觀念 → 預測結果 → 修改少量程式 → 操作驗證 → 回答理解題。每課結束停下，等學習者回覆才繼續。不一次交付完整 Saga 搜尋版本，遇到不熟悉的語法先獨立練習。

目前提供第 0～2 課筆記與 scripts/saga/ 的獨立腳本。第 2 課已安裝 redux-saga 1.5.1；不自動 commit 或 push。

## 現有基準與最終範圍

目前 TaxonSearch 用 useState 管輸入，useEffect 處理 500ms debounce、請求、AbortController 與過期回應防護，再 dispatch hydrateData 更新結果。首次資料由 getServerSideProps 取得，後續搜尋走站內 /api/redux-learning/taxa。

最終在獨立的 /saga-learning 頁面以 Saga 實作瀏覽器搜尋的非同步流程，不改寫原 Redux 頁面。輸入與中文選字仍留在元件；查詢資料、等待與請求狀態由 slice 管理。保留 SSR 初始資料、摘要頁、計數器與卡片樣式。不加入輪詢、自動重試、登入或其他新功能。

Saga 是本次學習題材，不是 API 搜尋的必要依賴。Redux 官方通常優先建議 RTK Query 處理資料查詢與快取，listener middleware 處理事件驅動流程。

## 小課程與驗收

### 第 0 課：Saga 負責什麼？

筆記：[第 0 課](saga-lesson-00.md)。只比較目前與未來的資料流程，不修改功能、不安裝依賴。

完成條件：能區分元件、Saga、reducer、store 的責任。

理解題：如果 Saga 已經取得 API 結果，為什麼仍要 dispatch action？

### 第 1 課：先認識 function\* 與 yield

使用獨立 Node.js 小腳本練習 generator、next()、value 與 done，先不接 Redux、API 或 React。說明 yield 暫停 generator，並不等於語法本身會自動等待 Promise。

完成條件：能預測連續呼叫 next() 的結果，說明 generator 與一般函式的不同。

### 第 2 課：讓 action 觸發 Saga

確認 redux-saga 相容版本後才安裝並記錄解析版本。以隔離的終端機練習建立 middleware、啟動 watcher，先觀察單一教學 action，不動網站搜尋。

完成條件：dispatch 指定 action 才觸發一次預期的處理；不相符的 action 不觸發；腳本結束可停止任務。

理解題：Saga 是另一份 store 嗎？middleware 放在哪一層？

### 第 3 課：call 與 put

使用受控假非同步函式。以 call 取得結果，再 put action，讓 reducer 更新狀態；先不接真實 API。把 watcher（等事件）與 worker（執行工作）分開解釋。

完成條件：成功與拋錯都得到預期狀態；reducer 仍沒有 API 呼叫。

理解題：put 與元件中的 dispatch 有什麼關係？

### 第 4 課：接上站內 API

先用手動按鈕練習一次搜尋，串接現有站內 API 與成功／空結果／失敗處理。網站接線時同時提供瀏覽器啟動、卸載清理與 SSR 不啟動 watcher 的基本機制；新 Saga 元件不保留原搜尋 effect 的請求邏輯，避免雙重請求；既有 Redux 元件維持原樣。本課暫時使用按鈕，防止同時引入 debounce 與競態概念。

完成條件：單次搜尋可以顯示結果、空結果或錯誤；計數不受影響；初次 SSR 不重複抓資料。

### 第 5 課：只採用最新搜尋

使用 takeLatest 解釋「新任務取代舊任務」，接上 finally 與 AbortController。使用受控的慢 A、快 B 回應驗證；明確區分取消 Saga 任務與中止瀏覽器 fetch。瀏覽器中止後，站內 API 已發出的上游請求不保證一起中止。

完成條件：A 不會晚回來覆蓋 B；取消不被顯示成查詢失敗；清空與離開頁面可取消等待中的工作。

### 第 6 課：恢復 500ms debounce 與中文選字

在最新任務內先 delay(500)，每次新輸入立即取消前一任務，涵蓋計時與已開始的請求。移除暫時的查詢按鈕，恢復自動搜尋。中文組字期間不發送搜尋，組字開始要取消既有工作；完成選字後才計時。清空立即清除結果、不呼叫上游。

完成條件：快速輸入只查最後的字串；中文選字中不請求；首次掛載不重複 SSR 查詢；特殊字元正確編碼；等待期間不誤標舊列表為新結果。

### 第 7 課：生命週期與整體驗證

回頭拆解第 4 課加入的啟動與清理：每份 store 使用自己的 middleware，伺服器請求不啟動長駐 watcher；瀏覽器啟動可重複呼叫而不重複訂閱，cleanup 後可以重啟，包含開發模式 Strict Mode 的 setup → cleanup → setup。SSR 換頁套用新 data 前取消舊搜尋，避免背景結果覆蓋 SSR 快照。

完成條件：獨立 store 互不污染；換頁與重啟沒有重複 watcher；離頁後舊請求不寫入結果；counter 保持；SSR 原始 HTML、完整載入、Link 導覽與 hydration 都正常。

## 預計檔案

- store/saga-learning/search.js：搜尋事件與執行狀態。
- store/saga-learning/sagas.js：watcher、worker 與搜尋流程。
- store/saga-learning/store.js：middleware 與任務啟動／停止。
- components/saga-learning/TaxonSearch.js：保留輸入、選字與發送事件。
- pages/saga-learning/index.js：獨立路由與 SSR 初始資料。
- components/saga-learning/SagaProvider.js：頁面範圍的 Provider、任務啟動與清理，不修改全站 _app.js。
- scripts/saga/lesson-*.mjs：依課程需要加入有意義的語法練習與流程測試。
- docs/saga/saga-lesson-\*.md：只在進入該課時新增筆記。

命名與拆檔會隨實作調整；不預先產出所有課程的完成版。

## 進度與驗證

- [V] 0：責任分工。
- [V] 1：generator 與 yield。
- [ ] 2：middleware 與 action 監聽。
- [ ] 3：call、put 與錯誤處理。
- [ ] 4：站內 API 搜尋。
- [ ] 5：最新任務、取消與競態。
- [ ] 6：debounce、中文選字與清空。
- [ ] 7：生命週期、SSR 與整體驗證。

每課記錄程式變更、實測結果、理解題與未完成事項，未驗證不勾選。修改功能前重測 lint/build 基準。已知先前 build 被 /reCAPTCHA 的 RECAPTCHA_KEY 未定義阻擋，後續應重新確認，不能直接宣稱完整 build 通過。

非同步流程用受控請求與計時驗證，重點在可觀察行為，不只比較 generator yield 的內部步驟。功能變更後回歸第 6、7 課腳本；瀏覽器另外驗證中文輸入、快速輸入、換頁與 hydration。文件階段只檢查 Git 差異，不宣稱已完成 Saga 功能。

## 官方參考

- [Redux 副作用工具選擇](https://redux.js.org/usage/side-effects-approaches)
- [Saga API：call、put、takeLatest、delay 與 middleware.run](https://redux-saga.js.org/docs/api/)
- [Saga 任務取消](https://redux-saga.js.org/docs/advanced/TaskCancellation/)
- [Saga debounce 範例](https://redux-saga.js.org/docs/recipes/)
- [Redux Toolkit configureStore](https://redux-toolkit.js.org/api/configurestore/)
