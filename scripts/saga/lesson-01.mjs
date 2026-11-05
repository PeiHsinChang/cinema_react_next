function* searchSteps() {
  console.log('A：開始流程')
  yield '等待輸入'
  console.log('B：繼續流程')
  yield '準備搜尋'
  return '流程結束'
}

console.log('\n=== 1. yield / next()：暫停與繼續 ===')
const task = searchSteps()
console.log('建立 generator 後')
console.log('第一次 next：', task.next())
console.log('第二次 next：', task.next())
console.log('第三次 next：', task.next())
console.log('第四次 next：', task.next())

console.log('\n=== 2. next(value)：把值送回 yield 暫停處 ===')
function* greet() {
  const name = yield '你叫什麼名字？'
  const topic = yield `你好，${name}，想學什麼？`
  return `${name}想學${topic}`
}

const greeting = greet()
console.log('啟動，第一次 next 的參數不會被接收：', greeting.next('這個值不會存進 name'))
console.log('送入 name：', greeting.next('小明'))
console.log('送入 topic：', greeting.next('Saga'))

console.log('\n=== 3. yield：可以交出不同型別 ===')
function* values() {
  yield 123
  yield { name: '攀蜥' }
  yield ['A', 'B']
  yield true
  yield
}

const differentValues = values()
for (let index = 1; index <= 6; index += 1) {
  console.log(`第 ${index} 次 next：`, differentValues.next())
}

console.log('\n=== 4. return(value)：從外部提早結束，執行 finally ===')
function* cancellableSteps() {
  try {
    yield '工作開始'
    yield '這個步驟將被跳過'
  } finally {
    console.log('finally：執行清理')
  }
  return '正常完成'
}

const cancellable = cancellableSteps()
console.log('啟動：', cancellable.next())
console.log('外部結束：', cancellable.return('使用者取消'))
console.log('結束後再 next：', cancellable.next())

console.log('\n=== 5. throw(error)：在暫停處拋入錯誤 ===')
function* recoverableSteps() {
  try {
    const result = yield '等待結果'
    return result
  } catch (error) {
    yield `捕捉錯誤：${error.message}`
    return '錯誤已處理'
  }
}

const recoverable = recoverableSteps()
console.log('啟動：', recoverable.next())
console.log('送入錯誤，由內部 catch 接住：', recoverable.throw(new Error('模擬請求失敗')))
console.log('繼續錯誤處理：', recoverable.next())

console.log('\n=== 6. yield*：委派給另一個 generator ===')
function* childSteps() {
  yield '子流程 A'
  yield '子流程 B'
  return '子流程完成'
}

function* parentSteps() {
  yield '主流程開始'
  const result = yield* childSteps()
  return `主流程收到：${result}`
}

const parent = parentSteps()
console.log('第一次 next：', parent.next())
console.log('第二次 next：', parent.next())
console.log('第三次 next：', parent.next())
console.log('第四次 next，子流程 return 交回主流程：', parent.next())

console.log('\n=== 7. for...of：自動呼叫 next()，不取出 return 的值 ===')
for (const value of parentSteps()) {
  console.log('迭代取得：', value)
}

console.log('\n=== 8. yield Promise：由外部等待，再送回結果 ===')
function* loadData() {
  const result = yield Promise.resolve({ items: ['攀蜥'] })
  console.log('generator 收到結果：', result)
  return result.items.length
}

const loading = loadData()
const pending = loading.next()
console.log('交出的是 Promise：', pending.value instanceof Promise)
console.log('此時 done：', pending.done)
const data = await pending.value
console.log('外部 await 完成；下一行才透過 next(data) 恢復 generator')
console.log('送回資料：', loading.next(data))
