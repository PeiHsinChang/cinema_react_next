import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydrateData } from "../../store/redux-learning/data";

export default function TaxonSearch() {
  const data = useSelector((state) => state.data);
  const [input, setInput] = useState(data.query);
  const [composing, setComposing] = useState(false);
  const [pending, setPending] = useState(false);
  const generation = useRef(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const version = ++generation.current;
    const query = input.trim();
    if (composing || query === data.query) {
      setPending(false);
      return;
    }
    if (!query) {
      dispatch(hydrateData({ items: [], total: 0, query: "", status: "idle", error: null }));
      setPending(false);
      return;
    }

    const controller = new AbortController();
    setPending(true);
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ name: query });
        const response = await fetch(`/api/redux-learning/taxa?${params}`, {
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok && result.status !== "failed") throw new Error("HTTP");
        if (generation.current === version && !controller.signal.aborted) {
          dispatch(hydrateData(result));
        }
      } catch {
        if (generation.current === version && !controller.signal.aborted) {
          dispatch(hydrateData({
            items: [], total: 0, query, status: "failed",
            error: "目前無法取得分類資料，請稍後再試。",
          }));
        }
      } finally {
        if (generation.current === version && !controller.signal.aborted) setPending(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [input, composing, data.query, dispatch]);

  return (
    <section aria-label="分類搜尋">
      <label htmlFor="taxon-query">輸入分類名稱</label>{" "}
      <input
        id="taxon-query"
        type="search"
        value={input}
        aria-describedby="taxon-search-help taxon-search-status"
        onChange={(event) => { generation.current += 1; setInput(event.target.value); }}
        onCompositionStart={() => { generation.current += 1; setComposing(true); }}
        onCompositionEnd={(event) => { setInput(event.currentTarget.value); setComposing(false); }}
      />
      <p id="taxon-search-help">停止輸入 500 毫秒後自動查詢；清空可清除結果。</p>
      <p id="taxon-search-status" role="status">
        {composing ? "請完成選字" : pending ? "正在等待輸入或查詢，以下保留上次結果…" : ""}
      </p>
    </section>
  );
}
