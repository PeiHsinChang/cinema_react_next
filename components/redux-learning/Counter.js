import { useDispatch, useSelector } from "react-redux";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch({ type: "INCREMENT" });
  }

  function handleDecrement() {
    dispatch({ type: "DECREMENT" });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  return (
    <section aria-labelledby="counter-heading">
      <h2 id="counter-heading">計數器</h2>
      <p>目前數值：<output aria-live="polite">{count}</output></p>
      <button type="button" onClick={handleIncrement}>加一</button>
      <button type="button" onClick={handleDecrement}>減一</button>
      <button type="button" onClick={handleReset}>歸零</button>
    </section>
  );
}
