export async function fetchTaxa(fetcher = fetch, timeoutMs = 10000) {
  const query = "攀蜥";
  const base = { items: [], total: 0, query, status: "failed", error: null };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const params = new URLSearchParams({ name: query });
    const response = await fetcher(`https://www.tbn.org.tw/api/v26/taxon?${params}`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("HTTP");
    const body = await response.json();
    if (body?.meta?.status !== "SUCCESS" || !Array.isArray(body.data) ||
        !Number.isInteger(body.meta.total) || body.meta.total < 0) {
      throw new Error("FORMAT");
    }

    const text = (value) => typeof value === "string" && value.trim() ? value : "未提供";
    const items = body.data.map((item) => {
      if (!item || typeof item.taxonUUID !== "string" || !item.taxonUUID.trim()) {
        throw new Error("FORMAT");
      }
      return {
        taxonUUID: item.taxonUUID,
        vernacularName: text(item.vernacularName),
        simplifiedScientificName: text(item.simplifiedScientificName),
        taxonRank: text(item.taxonRank),
      };
    });
    if (new Set(items.map((item) => item.taxonUUID)).size !== items.length) {
      throw new Error("FORMAT");
    }
    return { ...base, items, total: body.meta.total, status: "succeeded" };
  } catch {
    return {
      ...base,
      error: controller.signal.aborted
        ? "查詢逾時，請稍後再試。"
        : "目前無法取得分類資料，請稍後再試。",
    };
  } finally {
    clearTimeout(timer);
  }
}
