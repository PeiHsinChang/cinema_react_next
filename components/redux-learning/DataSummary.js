import { useSelector } from "react-redux";

export default function DataSummary() {
  const data = useSelector((state) => state.data);

  return (
    <section aria-labelledby="data-heading">
      <h2 id="data-heading">SSR 資料摘要</h2>
      <p>狀態：{data.status}</p>
      {data.query && <p>查詢：{data.query}；總計 {data.total} 筆分類資料</p>}
      {data.status === "failed" ? <p role="alert">{data.error}</p> :
        data.items.length === 0 ? <p>{data.status === "succeeded" ? "查無分類資料" : "尚無資料"}</p> : (
        <ul>{data.items.map((item) => (
          <li key={item.taxonUUID || item.id}>
            {item.name || `${item.vernacularName}／${item.simplifiedScientificName}／${item.taxonRank}`}
          </li>
        ))}</ul>
      )}
    </section>
  );
}
