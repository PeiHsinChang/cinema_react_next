import assert from "node:assert/strict";
import { fetchTaxa } from "../store/redux-learning/tbn.js";
import { makeStore } from "../store/redux-learning/store.js";
import { hydrateData } from "../store/redux-learning/data.js";
import { increment } from "../store/redux-learning/counter.js";

const valid = { meta: { status: "SUCCESS", total: 1 }, data: [{ taxonUUID: "test-1", vernacularName: "測試分類", scientificName: "<i>unused</i>" }] };
const mock = (body, ok = true) => async () => ({ ok, json: async () => body });
const success = await fetchTaxa(mock(valid));
assert.equal(success.status, "succeeded");
assert.equal(success.items[0].simplifiedScientificName, "未提供");
assert.equal("scientificName" in success.items[0], false);
const empty = await fetchTaxa(mock({ meta: { status: "SUCCESS", total: 0 }, data: [] }));
assert.equal(empty.status, "succeeded");
assert.deepEqual(empty.items, []);
for (const fetcher of [
  mock(valid, false),
  mock({ meta: { status: "ERROR", total: 0 }, data: [] }),
  mock({ meta: { status: "SUCCESS", total: 1 }, data: {} }),
  mock({ ...valid, data: [null] }),
  mock({ ...valid, data: [valid.data[0], valid.data[0]] }),
  async () => { throw new Error("network detail must stay private"); },
  async () => ({ ok: true, json: async () => { throw new SyntaxError("bad JSON"); } }),
]) {
  const result = await fetchTaxa(fetcher);
  assert.equal(result.status, "failed");
  assert.equal(result.error.includes("private"), false);
  assert.doesNotThrow(() => JSON.stringify(result));
}
const timeout = await fetchTaxa((url, { signal }) => new Promise((resolve, reject) => {
  signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
}), 5);
assert.match(timeout.error, /逾時/);
const store = makeStore();
store.dispatch(increment());
for (const data of [success, empty, timeout]) {
  store.dispatch(hydrateData(data));
  assert.equal(store.getState().counter.value, 1);
  assert.deepEqual(store.getState().data, data);
}
if (process.argv.includes("--live")) {
  const live = await fetchTaxa();
  assert.equal(live.status, "succeeded", live.error);
  console.log(`實際 API 成功：${live.items.length} 筆，total=${live.total}`);
}
console.log("通過：成功、空結果、HTTP/格式/JSON/網路失敗、逾時、精簡欄位及計數保留。");
