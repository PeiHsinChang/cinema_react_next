import Link from "next/link";
import DataSummary from "../../components/redux-learning/DataSummary";
import TaxonSearch from "../../components/redux-learning/TaxonSearch";
import { getTaxonServerSideProps } from "../../store/redux-learning/ssr";
import Counter from "../../components/redux-learning/Counter";
import CounterSummary from "../../components/redux-learning/CounterSummary";

export default function ReduxLearning() {
  return (
    <main>
      <h1>第 7 課：查詢 TBN 攀蜥分類資料</h1>
      <p>先把計數器加到 3，再前往摘要頁，觀察共用的數值。</p>
      <Counter />
      <CounterSummary />
      <TaxonSearch />
      <DataSummary />
      <p><Link href="/redux-learning/summary">前往摘要頁</Link></p>
      <p>透過連結換頁會保留數值；完整重新整理後會回到 0。</p>
    </main>
  );
}

export const getServerSideProps = getTaxonServerSideProps;
