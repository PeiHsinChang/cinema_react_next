# 第 7 課：查詢 TBN 攀蜥分類資料

這是最後一課，沿用第 6 課的交接流程，只把固定資料換成 API 結果。

## 先看熟悉的部分

[ssr.js](../../store/redux-learning/ssr.js) 新增 getTaxonServerSideProps，首頁將它匯出成 getServerSideProps：

```js
const store = makeStore();
store.dispatch(hydrateData(await fetchTaxa()));
return { props: { initialReduxState: store.getState() } };
```

唯一新增的核心觀念是 `await fetchTaxa()`：先等伺服器取得 API 資料，才 dispatch。API 請求放在 reducer 外面，reducer 仍只處理狀態更新。

```text
伺服器請求 TBN → 整理結果 → dispatch
→ getState → props → 瀏覽器 store → useSelector 顯示
```

## 再看 API 如何整理

[tbn.js](../../store/redux-learning/tbn.js) 固定查詢 name=攀蜥，使用 URLSearchParams 編碼。從回應的 data 陣列，只取 taxonUUID、vernacularName、simplifiedScientificName、taxonRank，放進 Redux 的 data.items；另存 total、query、status、error。

API 的 data 是分類陣列，Redux 的 data 是包含 items 等欄位的狀態物件，兩者層級不同。

文字缺漏顯示「未提供」。不使用包含 HTML 的 scientificName 或 taxonName，也不使用 dangerouslySetInnerHTML。taxonUUID 用作列表識別。

2026-11-04 實際伺服器連線成功，回傳 7 筆分類資料；包含不同分類階層，不能稱為 7 種。筆數可能改變，不寫死驗收條件。這課未驗證瀏覽器 CORS，因為請求在伺服器發出。

## 成功、空結果與失敗

- 成功：status 是 succeeded，顯示分類資料及總筆數。
- 空結果：仍是 succeeded，items 為 []，顯示「查無分類資料」。
- 失敗：status 是 failed，顯示錯誤摘要，不讓整頁崩潰。

請求檢查 HTTP 狀態、meta.status、total、data 陣列及識別欄位，處理 JSON 解析錯誤、網路失敗與 10 秒逾時。錯誤以一般文字保存，不把 Error 物件或內部錯誤細節放進 props。

SSR 首次載入是在資料準備後才回傳 HTML，瀏覽器未必先看到 loading。不需要再用 useEffect 抓一次 API。_app 的「正在套用伺服器資料」是在換頁套用狀態時顯示，並非 API 請求進度。

## 動手驗證

1. 執行 yarn dev，開啟 http://localhost:3005/redux-learning，確認查詢攀蜥、分類列表和筆數可見。
2. 檢視網頁原始碼，確認分類名稱存在於 HTML 的列表內容。
3. 計數加到 3，前往摘要頁，確認列表和計數仍在。
4. 返回計數器，觸發 SSR 查詢，確認 counter 仍為 3。
5. 首頁完整重新整理：counter 為 0，重新取得 API 資料。
6. 摘要頁直接完整載入：沒有 SSR 查詢，顯示尚無資料。它只用來觀察同一份瀏覽器 store。
7. 檢查 console，確認沒有 hydration mismatch。

```sh
node --experimental-default-type=module scripts/redux-lesson-07.mjs
```

腳本使用受控回應檢查成功、空結果、失敗、逾時與計數保留；不是猜測上游空結果一定如何回應。加上 --live 可另測真實 API。

第 6 課固定資料函式與腳本仍保留作為參考；網站首頁已使用第 7 課 API，原本的 sample=b 連結已移除。

## 理解題

1. API 為什麼放在 getServerSideProps 的流程，而不是 reducer 裡？
2. 資料已經透過 props 傳入，什麼需求才值得再放進 Redux？如果只有一頁顯示資料，是否一定需要 Redux？
3. API 失敗和查無資料，status 與畫面有什麼不同？

進度：程式已提供，瀏覽器操作與理解題待完成；尚未勾選第 7 課驗收。

來源：[TBN taxon API](https://www.tbn.org.tw/api/v26/taxon?name=%E6%94%80%E8%9C%A5)。

實作驗證：第 6、7 課受控腳本通過；第 7 課 --live 真實請求通過（7 筆）；變更檔案 lint 與 git diff --check 通過。build 編譯成功，完整建置仍受既有 /reCAPTCHA 預先渲染的 RECAPTCHA_KEY 未定義問題阻擋。尚未執行瀏覽器 Link 導覽與 hydration 驗證。

## 延伸：input 與 debounce

現在首頁多了 [TaxonSearch.js](../../components/redux-learning/TaxonSearch.js)。輸入文字放在 useState，停止輸入 500 毫秒後才查詢。初次載入仍由 SSR 查詢「攀蜥」；之後的輸入透過站內 `/api/redux-learning/taxa?name=...` 查詢，站內 API 再呼叫 TBN。因此瀏覽器不直接連到 TBN，也不依賴上游 CORS。

```text
input → useState → 等 500ms → 站內 API → TBN
→ dispatch(hydrateData(result)) → Redux 列表更新
```

每次繼續輸入或離開頁面，都會清除尚未執行的 timer 並取消前一次瀏覽器請求；版本編號另外阻擋過期回應寫入 Redux。伺服器已開始的上游請求可能仍會完成，但舊結果不會覆蓋新查詢。中文輸入法選字期間不發送請求，完成選字後才開始計時。

空白會 trim；清空輸入立即清除結果，不呼叫 TBN。等待及查詢期間保留並標示上次結果，成功／查無資料／失敗仍沿用原本顯示；counter 不會被搜尋更新。輸入查詢不寫入 URL，重新整理首頁會回到 SSR 預設的「攀蜥」。摘要頁透過 Link 可讀取目前搜尋結果；返回首頁會重新取得預設查詢。

操作檢查：快速輸入多個字，Network 應在停下 500ms 後才出現一次 taxa 請求；中文選字中不查詢。用慢速網路先查 A 再改 B，最後只能顯示 B 的結果。清空時列表清除，加到 3 的計數保持 3。

實作驗證：腳本額外驗證自訂查詢、特殊字元編碼及空白不發送請求；debounce、中文選字與慢速網路互動需在瀏覽器操作驗證。
