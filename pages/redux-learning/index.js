import Counter from "../../components/redux-learning/Counter";
import CounterSummary from "../../components/redux-learning/CounterSummary";

export default function ReduxLearning() {
  return (
    <main>
      <h1>第 3 課：React 與 Redux</h1>
      <p>操作計數器，觀察兩個元件的數值一起改變。</p>
      <Counter />
      <CounterSummary />
    </main>
  );
}
