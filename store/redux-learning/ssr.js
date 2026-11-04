import { makeStore } from "./store.js";
import { hydrateData } from "./data.js";
import { fetchTaxa } from "./tbn.js";

export async function getTaxonServerSideProps() {
  const store = makeStore();
  store.dispatch(hydrateData(await fetchTaxa()));
  return { props: { initialReduxState: store.getState() } };
}

export function getLessonServerSideProps({ query }) {
  const store = makeStore();
  const sample = query.sample === "b" ? "B" : "A";

  store.dispatch(hydrateData({
    items: [{ id: sample, name: `SSR 固定資料 ${sample}` }],
    status: "succeeded",
    error: null,
  }));

  return { props: { initialReduxState: store.getState() } };
}
