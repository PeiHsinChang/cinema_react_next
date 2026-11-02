import { useSelector } from "react-redux";

export default function CounterSummary() {
  const count = useSelector((state) => state.counter.value);

  return (
    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading">另一個元件：結果摘要</h2>
      <p>共用的數值：<output aria-live="polite">{count}</output></p>
    </section>
  );
}
