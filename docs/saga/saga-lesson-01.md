# 第 1 課：function* 與 yield

對應 [學習規格](saga-learning-spec.md)。本課只執行獨立 Node.js 腳本，不安裝 Saga、不修改網站。

## 一個主要觀念

一般函式呼叫後會一路執行到 return；generator 函式可以在 yield 暫停，之後透過 next() 繼續。

```js
function* steps() {
  yield '第一站'
  yield '第二站'
  return '終點'
}

const task = steps()
```

function* 宣告 generator 函式。呼叫 steps() 會建立 generator 物件，此時函式本體還沒有開始執行。

每次 task.next() 都會執行到下一個 yield 或 return，回傳 { value, done }：value 是交出的值，done 表示 generator 是否已結束。停在 yield 時 done 是 false；執行 return 時 done 是 true。結束後再 next()，得到 { value: undefined, done: true }。

yield 不是 await，本身不會自動等待 Promise。本課的 generator 也還不是 Saga；後續才加入解讀 effect、推進 generator 的 middleware。

## yield 交出 Promise 是什麼意思？

yield 可以交出任何型別的值，包括 Promise 物件。「交出 Promise」是把物件放進 next() 回傳的 value，而不是自動取得 Promise 完成後的結果。

```js
function* load() {
  const data = yield Promise.resolve('搜尋結果')
  console.log(data)
}

const task = load()
const step = task.next()
```

此時 step.value 是 Promise 物件，step.done 是 false。函式停在 yield，data 的賦值尚未完成；即使 Promise 已完成，generator 也不會自動繼續。

外部可以等待 Promise，再把結果送回暫停處。以下接續前面的程式，在 .mjs 腳本中執行：

```js
const result = await step.value
task.next(result)
```

1. await step.value：外部等待 Promise，取得字串「搜尋結果」。
2. task.next(result)：恢復 generator，讓 yield 表達式的結果變成傳入的字串，再存進 data。
3. console.log(data)：印出「搜尋結果」，隨後到達函式結尾，這次 next() 回傳 { value: undefined, done: true }。

要分清楚兩件事：**Promise 完成代表工作有結果；next(result) 才讓 generator 繼續，並把結果送回去。** 若只呼叫 next() 而未傳值，data 會是 undefined，不會自動得到 Promise 的結果。

相對地，async 函式中的 await 會在 Promise 完成後自動恢復函式。Saga middleware 則會接手等待與推進 generator；後續會學到用 yield call(...) 交出工作描述，由 middleware 執行並送回結果。

## 先預測，再執行

打開 [練習腳本](../../scripts/saga/lesson-01.mjs)，先預測：

1. 「建立 generator 後」和「A：開始流程」，哪個先印出？
2. 四次 next() 的 value、done 各是什麼？

預測後執行：

```sh
node scripts/saga/lesson-01.mjs
```

觀察 A、B 分別在哪一次 next() 才出現。若要自行修改少量程式，可以在 return 前增加一個 yield，再預測原本第三、四次 next() 的輸出。

## 理解題與進度

1. 為什麼呼叫 searchSteps() 時，還沒印出 A？
2. 第二次 next() 從頭開始，還是從上次暫停的位置繼續？
3. yield 和 return 回傳的 done 有什麼差別？

學習者已正確預測四次 next() 的 value、done，並回答呼叫 generator 函式尚未執行本體、next() 從暫停處繼續，以及 yield 與 return 的 done 差異。已補充 Promise 交出與恢復的筆記，尚待學習者操作確認；本課先不勾選完成，不進入第 2 課。第 0 課仍待確認「reducer 負責更新狀態」。

2026-11-05 教學者實測：腳本正常結束，建立物件的訊息先於 A；兩次 yield 的 done 為 false，return 的 done 為 true，結束後再次 next() 的 value 為 undefined、done 為 true。網站功能未變更，未執行網站 lint/build。
