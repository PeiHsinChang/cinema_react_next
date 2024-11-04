# cinema_react_next

## Introduction

期望使用到的技術: react.js next.js，這是使用[Next.js](https://nextjs.org/) 的[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 專案建置的。

## Getting Started

此專案採用 yarn 套件管理作為開發工具，當專案載下來後，請執行以下指令進行操作

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
