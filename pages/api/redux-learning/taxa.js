import { fetchTaxa } from "../../../store/redux-learning/tbn.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "不支援的請求方式" });
  }
  if (typeof req.query.name !== "string") {
    return res.status(400).json({ error: "請提供單一查詢名稱" });
  }
  res.setHeader("Cache-Control", "no-store");
  const data = await fetchTaxa(fetch, 10000, req.query.name);
  return res.status(data.status === "failed" ? 502 : 200).json(data);
}
