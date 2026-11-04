import Link from "next/link";
import DataSummary from "../../components/redux-learning/DataSummary";
import CounterSummary from "../../components/redux-learning/CounterSummary";

export default function ReduxLearningSummary() {
  return (
    <main>
      <h1>第 7 課：跨頁摘要</h1>
      <p>這個頁面直接讀取同一份 Redux store 的 counter.value。</p>
      <CounterSummary />
      <DataSummary />
      <p><Link href="/redux-learning">返回計數器</Link></p>
      <p>試著完整重新整理：數值會回到預設的 0。</p>
    </main>
  );
}
