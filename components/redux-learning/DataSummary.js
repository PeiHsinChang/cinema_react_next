import { useSelector } from "react-redux";
import styles from "./DataSummary.module.scss";

export default function DataSummary() {
  const data = useSelector((state) => state.data);

  return (
    <section className={styles.summary} aria-labelledby="data-heading">
      <h2 id="data-heading">SSR 資料摘要</h2>
      <p>狀態：{data.status}</p>
      {data.query && <p>查詢：{data.query}；總計 {data.total} 筆分類資料</p>}
      {data.status === "failed" ? <p role="alert">{data.error}</p> :
        data.items.length === 0 ? <p>{data.status === "succeeded" ? "查無分類資料" : "尚無資料"}</p> : (
        <ul className={styles.list} role="list">{data.items.map((item) => (
          <li className={styles.card} key={item.taxonUUID || item.id}>
            {item.name ? <h3 className={styles.name}>{item.name}</h3> : (
              <>
                <div className={styles.cardHeader}>
                  <h3 className={styles.name}>{item.vernacularName}</h3>
                  <span className={styles.rank}>{item.taxonRank}</span>
                </div>
                <p className={styles.scientificName}>{item.simplifiedScientificName}</p>
              </>
            )}
          </li>
        ))}</ul>
      )}
    </section>
  );
}
