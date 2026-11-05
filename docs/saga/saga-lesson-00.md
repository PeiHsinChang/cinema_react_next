# 第 0 課：Saga 負責什麼？

對應 [Saga 學習規格](saga-learning-spec.md)。本課只認識角色，不安裝套件，也不改寫搜尋。

## 從目前熟悉的搜尋開始

目前 [TaxonSearch.js](../../components/redux-learning/TaxonSearch.js) 做了幾件事：保存輸入文字、等 500 毫秒、呼叫 API、取消舊請求，最後 dispatch 更新結果。

```text
輸入文字
→ 元件等待 500ms
→ 元件呼叫 API
→ 元件 dispatch(hydrateData(結果))
→ reducer 更新狀態
→ useSelector 讓列表顯示新結果
```

我們要把「等待與請求」搬給 Saga。Saga 是管理副作用流程的工具；這裡的副作用指等待計時、發送網路請求等工作。

```text
輸入文字
→ 元件 dispatch「搜尋這個名稱」
→ Saga 收到事件，等待 500ms 並呼叫 API
→ Saga dispatch「搜尋完成」
→ reducer 更新狀態
→ useSelector 讓列表顯示新結果
```

事件名稱是用來解釋流程的示意，實際 action 會在後續課程建立。

## 四個角色

| 角色 | 負責的工作 | 搜尋例子 |
| --- | --- | --- |
| 元件 | 接收操作、顯示畫面 | 使用者輸入「攀蜥」 |
| Saga | 等事件、安排非同步工作 | 等待後查 API，處理取消與失敗 |
| reducer | 根據 action 算出新狀態 | 把搜尋結果放進 items |
| store | 保存狀態 | 保存 items、status、error |

Saga 不是另一份 store，也不取代 reducer。取得資料後仍需 dispatch action，讓 reducer 更新 store，畫面才會讀到結果。

這課先記住：元件提出需求，Saga 處理等待與請求，reducer 更新資料。

## 理解題

1. 搜尋要等 500ms，未來應由 Saga 還是 reducer 負責？
2. Saga 拿到 API 結果後，為什麼還需要 dispatch action？

進度：已提供觀念說明，待學習者回答。完成後才進第 1 課 function* 與 yield。
