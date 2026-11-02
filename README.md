# cinema_react_next

## Introduction

期望使用到的技術: react.js next.js，這是使用[Next.js](https://nextjs.org/) 的[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 專案建置的。

## Getting Started

此專案採用 yarn 套件管理作為開發工具，當專案載下來後，請執行以下指令進行操作

Copy the environment variable template and fill in your own values:

```bash
cp .env.example .env
```

1. 請先用 yarn 把 node_modules 裡的套件安裝起來，指令如下

```bash
yarn
```

2. node_modules 出現之後，就可以啟動此專案的開發模式，指令如下

```bash
yarn dev
```

3. 專案打包，指令如下

```bash
yarn build
```

4. 打開瀏覽其查看結果 -> [http://localhost:3005](http://localhost:3005)

## 路由一覽

目前使用 Next.js Pages Router，共有 11 個頁面路由與 3 個 API 路由。啟動 `yarn dev` 後，以 `http://localhost:3005` 加上以下路徑即可存取。路徑大小寫請與表格一致。

### 頁面路由

| 路由 | 功能 | 對應檔案 |
| --- | --- | --- |
| `/` | 預設首頁、裝置方向感測測試 | [pages/index.js](pages/index.js) |
| `/home` | 電影院首頁 | [pages/home.js](pages/home.js) |
| `/cardGame` | 翻牌配對遊戲 | [pages/cardGame.js](pages/cardGame.js) |
| `/logicQuestions` | 問答小遊戲 | [pages/logicQuestions.js](pages/logicQuestions.js) |
| `/puzzleGame` | 數字拼圖遊戲 | [pages/puzzleGame.js](pages/puzzleGame.js) |
| `/scratchoff` | 刮刮樂 | [pages/scratchoff.js](pages/scratchoff.js) |
| `/intersectionObserver` | 元素進入視窗的觀察測試 | [pages/intersectionObserver.js](pages/intersectionObserver.js) |
| `/reCAPTCHA` | Google reCAPTCHA 驗證測試，需設定 `RECAPTCHA_KEY` | [pages/reCAPTCHA.js](pages/reCAPTCHA.js) |
| `/upload` | 讀取檔案並顯示文字內容 | [pages/upload.js](pages/upload.js) |
| `/uploadFile` | XLSX／CSV 匯入與抽籤 | [pages/uploadFile.js](pages/uploadFile.js) |
| `/uploadxlsx` | XLSX 匯入介面，抽籤功能尚未接上 | [pages/uploadxlsx.js](pages/uploadxlsx.js) |

### API 路由

| 路由 | 功能與狀態 | 對應檔案 |
| --- | --- | --- |
| `/api/hello` | 範例 API，回傳 `{ "name": "John Doe" }` | [pages/api/hello.js](pages/api/hello.js) |
| `/api/filenames` | 取得翻牌遊戲圖片檔名，供 `/cardGame` 使用 | [pages/api/filenames.js](pages/api/filenames.js) |
| `/api/readFile` | 檔案處理 API，尚未完成；目前未解析上傳檔案，直接讀取 `req.file.path` 可能造成錯誤 | [pages/api/readFile.js](pages/api/readFile.js) |

### 共用路由設定

- `pages/_app.js`：載入全域樣式與共用頁面設定，不提供獨立路由。
- `pages/_document.js`：設定 HTML 文件結構，不提供獨立路由。
- `app/layout.js`：目前沒有搭配 `page.js`，尚未提供 App Router 頁面。
- 目前沒有 `[id]` 這類動態路由。

## Learn More

- [Next.js 網路資源](https://nextjs.org/docs)

- [React 的相關文件](https://react.dev)

- [利用 Vercel 做專案的部署](https://nextjs.org/docs/deployment)

## Deploy on Vercel

此專案的部署平台使用[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)，是 NextJs 的團隊所開發的。

### 使用 next <Image />

在圖片 width 與 height 設置上，花了不少時間了解，才知道 height 跟 width 用來決定圖片的`比例` ，
參考文件: https://ithelp.ithome.com.tw/articles/10281104

### 問題選項

利用 react 元件製作一個問答小遊戲
Demo 網址: https://cinema-react-next-peihsinchang.vercel.app/logicQuestions

### 邏輯計算

Demo 網址: https://cinema-react-next-peihsinchang.vercel.app/puzzleGame

### 翻牌小遊戲

- 利用 next API router 做檔名的讀取，擷取檔名，在 cardGame render 圖檔與遊戲邏輯。

Demo 網址: https://cinema-react-next-peihsinchang.vercel.app/cardGame
