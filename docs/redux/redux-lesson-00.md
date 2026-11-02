# 第 0 課：認識 Redux

本課先理解觀念，尚未安裝套件或實作功能。對應 [Redux 學習 spec](redux-learning-spec.md)。

## Redux 解決什麼問題？

Redux 用來集中管理共用狀態，讓需要同一份資料的元件，不必一直透過 props 一層一層傳遞。

狀態就是「會改變、畫面需要知道的資料」，例如計數器數值、選取的攀蜥清單。

- useState 像自己的筆記本，適合元件自己的資料。
- Redux 像共用白板，適合多個地方一起讀取、修改的資料。

不用把所有資料都放進 Redux。搜尋框尚未送出的文字、卡片是否展開，通常用 useState 即可。少數元件共用資料，也可以先放在共同父元件，再傳 props。

## 五個基本名詞

| 名詞 | 白話意思 | 計數器範例 |
| --- | --- | --- |
| State | 目前的資料 | 目前數值是 2 |
| Store | 保存狀態、提供讀取與更新管道的地方 | 保存計數器的 state |
| Action | 描述發生了什麼事的訊息 | 「減一」 |
| Dispatch | 把 action 送給 Redux | 送出「減一」訊息 |
| Reducer | 根據舊 state 和 action，算出新 state 的規則 | 2 減 1，得到 1 |

Action 可以附帶資料，這份附帶資料通常稱為 payload，例如「增加 3」裡面的 3。

## 用吃飯的比喻理解

你提出的比喻可以整理成：

1. Store 記錄目前的 state：飽足程度是 2。
2. 實際吃了一碗飯，產生 action：「吃了一碗飯」，附帶份量等資料。
3. Dispatch 把這個訊息送給 Redux。
4. Reducer 根據原本的飽足程度與這次份量，依我們定義的規則算出新的飽足程度。
5. Store 保存新狀態，讀取這份狀態的畫面顯示「吃飽了」或「還沒吃飽」。

這只是理解資料更新的比喻。Redux 不負責真的吃飯；action 也不會自己執行吃飯。它記錄發生的事，reducer 計算這件事對狀態造成的改變。

Reducer 不操作畫面、不呼叫 API，也不直接修改傳入的舊狀態。之後使用 Redux Toolkit 時，會再解釋它如何幫忙處理不可變更新。

## Provider 是什麼？

Provider 是 React Redux 的元件，讓它裡面的元件能找到指定的 store。

```text
Provider（提供同一份 store）
├── 計數器：讀取數值、發送 action
└── 結果摘要：讀取同一份數值
```

- Store 是共用白板；Provider 讓這個範圍的元件能找到白板。
- useSelector：從 store 挑出元件要讀取的狀態。
- useDispatch：取得發送 action 的方法。

Provider 不負責計算新狀態，也不負責儲存資料。它提供存取 store 的管道，所以不用手動把 store 層層傳下去。沒有對應 Provider 的元件，無法透過這些 hooks 取得那份 store。

Redux 不一定是整個網站的「全域狀態」；共用範圍取決於 Provider 放在哪裡。

## 一次完整的更新

```text
目前 state 的數值是 2
    ↓
使用者按下「減一」
    ↓
dispatch 送出「減一」action
    ↓
reducer 根據舊值 2，算出新值 1
    ↓
store 保存新 state
    ↓
透過 useSelector 讀取這個值的元件顯示 1
```

記住分工：action 描述事件，reducer 計算新狀態，store 保存狀態，Provider 提供存取管道，React 元件呈現結果。

## 使用前先判斷

| 資料 | 可以先用什麼 |
| --- | --- |
| 某張卡片是否展開 | useState |
| 搜尋框正在輸入的文字 | useState |
| 只有一頁使用的 API 結果 | SSR props 或依取得方式使用本地狀態 |
| 列表頁、比較頁、導覽列共用並修改的選取清單 | 可以考慮 Redux |

串 API 不代表需要 Redux。這次課程用 TBN API，是為了練習 SSR 資料如何交給 Redux 和畫面。

Redux 也不會自動永久保存資料；重新整理後要保留內容，仍需重新取得資料或另外設計儲存方式。

## 本課學習紀錄

- 已討論：集中管理共用狀態、吃飯比喻、action 與 reducer 的分工、Provider 與兩個 hooks 的用途。
- 學習者已用自己的話描述狀態更新流程，並表示理解 Provider。
- 尚未實作：useState 計數器、Redux store 與 TypeScript；留待後續課程。
- 可回顧的理解題：目前是 2，按下減一，action 是什麼、新值是多少？哪些資料適合留在 useState？

下一課從 JavaScript 的 useState 計數器開始，先建立可以觀察的基準，再逐步改成 Redux。
