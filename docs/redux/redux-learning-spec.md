# Redux 與 SSR 逐步學習 Spec

日期：2026-11-02。狀態：教學規劃，尚未開始功能實作。

## 目標與教學方式

在 cinema_react_next 重走 next13 的 Redux 學習路線，從計數器開始，最後理解伺服器狀態如何傳到瀏覽器。使用現有 JavaScript、Next.js Pages Router 與 yarn。

每次只完成一課：說明觀念 → 預測畫面 → 一起修改少量程式 → 操作驗證 → 用自己的話解釋。每課結束停下來，等學習者回覆後才進下一課。不一次產出全部完成版；遇到不懂的概念先用具體例子說明。

本次只建立 spec。後續課程才安裝依賴、修改程式；不自動 commit、push，也不搬移或封存遠端 repositories。

## 什麼時候適合使用 Redux？

把狀態想成「會改變、畫面需要知道的資料」，例如輸入框的文字、查詢結果、選了哪些攀蜥。

useState 像元件自己的筆記本；Redux 像大家共用的白板。只有自己看的資料，放自己的筆記本就好。很多地方都要看、也會修改同一份資料時，才考慮用共用白板。

### 用攀蜥頁面想一想

| 情境                                                     | 可以先怎麼做                            | 原因                                       |
| -------------------------------------------------------- | --------------------------------------- | ------------------------------------------ |
| 搜尋框正在輸入「攀蜥」                                   | useState                                | 通常只有搜尋框附近需要知道尚未送出的文字   |
| 某張分類卡片展開或收起                                   | useState                                | 只影響這張卡片                             |
| 查詢結果只顯示在一個頁面                                 | SSR props，或依取得資料方式使用本地狀態 | 串 API 本身不需要 Redux                    |
| 同一頁的列表與筆數都要讀取結果                           | 先放在共同父元件，再用 props 傳下去     | 幾個元件共用資料，也不一定需要 Redux       |
| 列表頁選取攀蜥，比較頁讀取選取結果，導覽列也顯示選取數量 | 可以考慮 Redux                          | 多個頁面與元件需要同一份、會變動的選取資料 |
| 選取規則變多，例如不能重複、最多選三筆、可清空全部       | Redux 的價值更明顯                      | 可以把更新規則集中，方便理解與追查         |

以上的比較與選取是幫助理解的假設情境，不會自動加入本次實作範圍。

### 選之前先問三件事

1. 這份資料是不是只有一個元件需要？是的話，先用 useState。
2. 把資料放在共同父元件，再傳 props，是否已經很清楚？是的話，先維持這樣。
3. 是否有很多地方需要一起讀取、修改，而且更新規則越來越難管理？這時再考慮 Redux。

沒有「幾個元件以上一定要用」的固定門檻。重點是共用資料與更新規則是否已經讓程式難以維護。

### 為什麼我們這次還要用？

第一版只是查詢攀蜥並顯示結果，單靠 SSR props 就能完成。我們加入 Redux，是為了練習「共用狀態如何更新」以及「SSR 資料如何交給瀏覽器」，並用兩個教學元件與 summary 頁觀察它。

Redux 負責管理狀態；API 請求仍要另外撰寫。Redux 也不會自動把資料永久保存：完整重新整理後，要保留內容仍需重新取得資料或另外設計儲存方式。

第 0 課增加理解題：搜尋框文字、卡片展開、跨頁共用的選取清單，你會把哪些放 useState、哪些考慮 Redux？請各說一個原因。

## 已查證的歷史

查閱 next13 預設分支 main 的 commit 清單與以下全部 5 筆變更。這是已提交版本可觀察的順序，不代表當時每次本機編輯的順序；未涵蓋其他分支或未提交內容。以下日期為台北時間。

| 日期       | Commit                                                                                            | 實際變更                                                                                                                                                | 對應學習                                     |
| ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 2022-12-01 | [07d3de0](https://github.com/PeiHsinChang/next13/commit/07d3de02e0befd5139af50e885b442a07dce623d) | 只有 README                                                                                                                                             | 初始化                                       |
| 2022-12-01 | [a9ab8d1](https://github.com/PeiHsinChang/next13/commit/a9ab8d18f9fc133c49151b8d944c2f00cb7e520f) | 加入 Next.js、自訂 server、頁面與依賴；首頁使用 createStore、dispatch，但畫面讀取 useState；Provider 尚為註解                                           | 計數器、action、reducer、store               |
| 2022-12-05 | [ce8da1c](https://github.com/PeiHsinChang/next13/commit/ce8da1cd687db869366d8239e3d8a0b2e30829eb) | 修改 store.js，改用 configureStore，加入 preloadedState、initialiseStore、SAVE_API_DATA                                                                 | 抽出 store、初始狀態、伺服器與瀏覽器生命週期 |
| 2022-12-05 | [bc36304](https://github.com/PeiHsinChang/next13/commit/bc36304ef5e33a17887678f2fffd21e03ccd3792) | \_app 啟用 Provider；首頁改 useDispatch，在 getServerSideProps 抓藥局資料後 dispatch，再回傳 initialReduxState；另加入 SSR 包裝函式與 wrapper/saga 依賴 | React 整合與 SSR 狀態交接                    |
| 2022-12-06 | [128d044](https://github.com/PeiHsinChang/next13/commit/128d044ca4ac08e1865c19fe997c1284d77945d3) | 加入 Babel、Styleguidist 依賴與參考連結                                                                                                                 | 沒有新增 Redux 核心流程                      |

## 舊程式要理解、但不照搬的地方

- 首頁同時更新 useState 與 Redux，顯示值卻只來自 useState，無法證明 Redux 整合成功。
- store 的 counter 初始值是物件，卻執行 state + 1 或 state - 1，會造成錯誤型別或 NaN。新實作固定以 counter.value 儲存數字。
- a.js 的 useSelector() 沒有 selector；新實作每次明確指定讀取位置。
- 最早 store.js 引用未隨該版本加入的 reducer 與 middleware，並非可直接套用的完整範例。
- wrapper、withReduxSaga 有 import 或依賴，不等於已啟用。已查的版本沒有完整 Saga middleware、watcher 與 worker 流程。
- c.js 的包裝函式只是延伸 SSR context 的實驗，沒有完成登入保護；也不應把整個 req/res/context 當成可序列化 props。
- 自訂 server 與 7878 port 不是 Redux 的必要條件。本專案沿用現有 3005 port。

## 預計實作範圍

建立 /redux-learning 與 /redux-learning/summary 兩個 Pages Router 教學頁。保留目前首頁、遊戲與其他功能。

預計檔案：

- pages/redux-learning/index.js：計數器、兩個共用狀態元件、SSR 資料摘要。
- pages/redux-learning/summary.js：確認跨頁共用狀態。
- store/redux-learning/counter.js：先練習手寫 reducer，之後改用 createSlice。
- store/redux-learning/store.js：makeStore 與後續初始化規則。
- store/redux-learning/data.js：後期資料狀態與 action。
- components/redux-learning/：按需要拆分讀取與操作元件。
- pages/\_app.js：加入穩定的 Provider；保留現有 Head 與全域樣式。
- package.json、yarn.lock：進入依賴課程時才更新。

預計使用 @reduxjs/toolkit 與 react-redux；安裝前確認與現有 React 18.1.0 相容的版本並記錄解析結果，不為教學直接升級框架。不預先安裝 Saga、wrapper 或 Styleguidist。

## 課程與驗收

### 第 0 課：先認識狀態

學習筆記與討論紀錄：[第 0 課：認識 Redux](redux-lesson-00.md)。

不用安裝套件，先畫出「按鈕 → 更新資料 → 顯示值」的流程，說明 useState、action（發生什麼事）、reducer（如何算新狀態）、store（存放狀態）的角色。

完成條件：能指出計數器目前的值、加一事件，以及預期的新值。

理解題：按加一後，畫面為什麼會更新？

### 第 1 課：建立 useState 基準

學習筆記與操作步驟：[第 1 課：useState 計數器](redux-lesson-01.md)。已建立練習頁，待學習者操作與回覆理解題。

新增教學首頁，以 useState 完成加一、減一與歸零；這是比較基準，稍後會移除重複狀態。

完成條件：0 → 加兩次變 2 → 減一次變 1 → 歸零變 0。重新整理回到 0，既有首頁仍可開啟。

理解題：另一個頁面能直接讀取這個元件的 useState 嗎？

### 第 2 課：不接畫面，先看 Redux

學習筆記與操作步驟：[第 2 課：先看 Redux 本身](redux-lesson-02.md)。本課僅安裝 Redux Toolkit，React Redux 留到第 3 課。JavaScript 的 React/Redux 基礎完成後，再轉 TypeScript，接續 SSR 與 TBN API。

加入必要依賴。以 configureStore 和手寫純 reducer 建立一致的狀態形狀 counter.value。透過 getState、dispatch 觀察資料變化；不在 React render 中執行示範 dispatch，也不建立伺服器共用的可變 singleton。

完成條件：初始 0；INCREMENT 後為 1；未知 action 保持原狀；原始 state 不被修改；更新結果始終為數字。

理解題：dispatch 是否直接修改畫面？reducer 為什麼不抓 API？

### 第 3 課：讓 React 真正讀取 Redux

學習筆記：[第 3 課：把 Redux 接到 React](redux-lesson-03.md)。已提供 Provider 與兩個共用狀態元件，待操作驗證。

加入 Provider、useSelector、useDispatch，移除計數器的 useState。Provider 的 store 在同一次瀏覽器工作階段保持穩定；伺服器 render 各自建立 store，不共享其他請求的資料。

完成條件：兩個分開的元件讀取同一 counter.value，任一按鈕操作後同步顯示；沒有缺少 Provider 的錯誤，也沒有 render 一次就重設的問題。

理解題：Provider、useSelector、useDispatch 各自負責什麼？

### 第 4 課：使用 Redux Toolkit 整理

把手寫 reducer 改成 createSlice，使用產生的 action creators。對照舊的 type 字串，說明 slice、payload，以及 Immer 為何允許在 slice reducer 裡寫看似直接修改的程式。

完成條件：操作結果與上一課一致；能在 Redux DevTools（如已安裝）觀察 action 與狀態差異。未安裝擴充套件也能透過畫面和 getState 完成課程。

理解題：slice 是不是另一份 store？

### 第 5 課：跨頁與重新整理

新增 summary 頁，使用 next/link 在兩個教學頁之間導覽。確認 Provider 不會在換頁時被重建；先維持單一瀏覽器 store，不加入 localStorage。

完成條件：首頁加到 3 → summary 顯示 3 → 返回仍為 3；完整重新整理後回到預設 0；獨立新分頁不自動同步。

理解題：跨頁保留、重新整理保留，是不是同一件事？

### 第 6 課：SSR 初始狀態交接

對應 ce8da1c 與 bc36304。先用固定的小筆假資料，在 getServerSideProps 建立當次請求的 store、dispatch 資料，再把 getState 結果放進 initialReduxState。\_app 以同一快照產生伺服器 HTML 與瀏覽器初次狀態。

狀態分成 counter.value 與資料區 data（items、status、error）；SSR 僅更新 data，counter 不因 SSR 導覽而被覆蓋。完整載入時以 props 建立 store；瀏覽器換頁時以明確的 hydration action 合併新 data，缺少 initialReduxState 的頁面不重設 store。這是後續需實作與驗證的規則，不代表呼叫 configureStore(preloadedState) 就會自動完成換頁同步。

教學會逐步解釋這個手動流程，並對照官方 Pages Router 的 next-redux-wrapper 整合路線。若日後改採 wrapper，需要另行處理 HYDRATE 合併規則，不同時使用兩套 hydration 機制。

完成條件：完整載入即能在原始 HTML 看到資料摘要；瀏覽器無 hydration mismatch；兩個獨立請求帶入不同的受控測試資料時彼此不污染；加到 3 後換頁並重新取得 SSR data，計數仍為 3，data 更新成功。

理解題：伺服器 store 與瀏覽器 store 是同一個 JavaScript 物件嗎？為什麼每個請求需要自己的 store？

### 第 7 課：查詢 TBN 攀蜥分類資料

固定資料成功後，改接學習者指定的 [TBN taxon API](https://www.tbn.org.tw/api/v26/taxon?name=%E6%94%80%E8%9C%A5)。歷史段落保留原本的藥局實驗紀錄，新課程以攀蜥分類查詢為題。

2026-11-02 實際 GET 成功：回應為含 meta、links、data 的物件，meta.status 為 SUCCESS、meta.total 為 7、data 為 7 筆分類資料，links.next 為空字串。結果包含屬、種與種下階層，不把筆數描述成「7 種攀蜥」，也不把本次筆數寫死為驗收條件。這是伺服器端連線驗證，尚未驗證瀏覽器 CORS。

第一版固定查詢 name=攀蜥，在 getServerSideProps 取得資料。先不增加搜尋表單、分頁或收藏，讓學習重點維持在 SSR → Redux → 畫面。之後若加入搜尋，使用 URLSearchParams 編碼參數，另訂換頁及競態處理規則。

先顯示中文名 vernacularName、純文字學名 simplifiedScientificName、分類階層 taxonRank；以 taxonUUID 作識別。資料區 data.items 存放上述精簡欄位，另保存 total、query、status、error。此處 Redux 的 data.items 來自 API 回應的 data 陣列，兩者不是相同層級。空缺文字顯示「未提供」。

scientificName 與 taxonName 在本次回應中包含 HTML 標籤；初學版選用純文字欄位，以 React 文字渲染，不使用 dangerouslySetInnerHTML。保育狀態等欄位可能為 null，若日後顯示，不能將 null 解讀成「不受保護」或「沒有風險」。

檢查 HTTP 狀態、meta.status、解析錯誤、逾時與 data 是否為陣列，回傳可序列化的狀態。API 失敗顯示錯誤摘要，空結果顯示空狀態，不讓整頁崩潰；不把 Error 物件、req/res 或敏感內容放進 props。空結果、格式異常與失敗用受控假資料驗證，不猜測上游一定如何回傳。若來源無法存取，保留固定資料並記錄阻礙，不假裝已完成串接。

完成條件：成功、空結果、失敗三種情境都能顯示；SSR 成功資料初次載入就可見。說明 SSR 讀取期間瀏覽器未必已有可見的 loading 畫面，不為此加入第二次用戶端抓取。

理解題：資料已透過 props 傳入時，什麼需求才值得再放進 Redux？

## 驗證與完成定義

每課記錄實際變更、操作結果、理解題回覆與尚待釐清事項，完成才勾選。可建議各課的 commit 名稱，但由學習者決定何時提交。

- [V] 0：能說明狀態更新流程。
- [V] 1：本地計數器通過指定操作。
- [V] 2：store/reducer 行為與型別正確。
- [ ] 3：兩個元件確實共用 Redux 狀態。
- [ ] 4：createSlice 改寫後行為不變。
- [ ] 5：跨頁保留與重新整理重設符合規則。
- [ ] 6：SSR 初始資料一致、請求隔離、換頁合併正確。
- [ ] 7：外部資料成功、空結果、失敗皆有結果。

實作前先記錄目前 lint/build 基準；新增 Redux 後進行針對性的 reducer 驗證與瀏覽器操作，SSR 階段驗證完整載入及用戶端導覽兩條路徑。最後執行專案 lint/build；若既有問題阻擋，區分原有與新增問題並記錄，不自行擴大修改其他功能。

本文件階段僅檢查文件與 Git 差異，不宣稱功能或建置已通過。

## 官方參考

- [Redux：Server Rendering](https://redux.js.org/usage/server-rendering)：伺服器與瀏覽器狀態交接。
- [Redux：Next.js 整合](https://redux.js.org/usage/nextjs)：每次請求獨立 store、Pages Router 與 App Router 的差異。
- [Redux Toolkit Usage Guide](https://redux.js.org/toolkit/usage/usage-guide)：configureStore、createSlice 與非同步工作的位置。
- [Next.js：getServerSideProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props)：請求時取得資料與用戶端導覽行為。
