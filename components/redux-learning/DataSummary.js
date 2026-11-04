import { useSelector } from "react-redux";

export default function DataSummary() {
  const data = useSelector((state) => state.data);

  return (
    <section aria-labelledby="data-heading">
      <h2 id="data-heading">SSR 資料摘要</h2>
      <p>狀態：{data.status}</p>
      {data.items.length === 0 ? <p>尚無資料</p> : (
        <ul>{data.items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
      )}
    </section>
  );
}
