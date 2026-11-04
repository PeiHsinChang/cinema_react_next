import Link from "next/link";
import DataSummary from "../../components/redux-learning/DataSummary";
import { getLessonServerSideProps } from "../../store/redux-learning/ssr";
import Counter from "../../components/redux-learning/Counter";
import CounterSummary from "../../components/redux-learning/CounterSummary";

export default function ReduxLearning() {
  return (
    <main>
      <h1>第 6 課：SSR 初始狀態交接</h1>
      <p>先把計數器加到 3，再前往摘要頁，觀察共用的數值。</p>
      <Counter />
      <CounterSummary />
      <DataSummary />
      <p><Link href="/redux-learning?sample=b">換成固定資料 B（計數不歸零）</Link></p>
      <p><Link href="/redux-learning/summary">前往摘要頁</Link></p>
      <p>透過連結換頁會保留數值；完整重新整理後會回到 0。</p>
    </main>
  );
}

export const getServerSideProps = getLessonServerSideProps;
