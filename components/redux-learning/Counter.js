import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../../store/redux-learning/counter";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

  function handleReset() {
    dispatch(reset());
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
