import Counter from "../../components/redux-learning/Counter";
import CounterSummary from "../../components/redux-learning/CounterSummary";

export default function ReduxLearning() {
  return (
    <main>
      <h1>第 5 課：跨頁與重新整理</h1>
      <p>先把計數器加到 3，再前往摘要頁，觀察共用的數值。</p>
      <Counter />
      <CounterSummary />
      <p><Link href="/redux-learning/summary">前往摘要頁</Link></p>
      <p>透過連結換頁會保留數值；完整重新整理後會回到 0。</p>
    </main>
  );
}
import Link from "next/link";
