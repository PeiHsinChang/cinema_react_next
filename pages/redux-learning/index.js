import { useState } from "react";

export default function ReduxLearning() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>第 1 課：useState 計數器</h1>
      <p>目前數值：<output aria-live="polite">{count}</output></p>
      <button type="button" onClick={() => setCount((previous) => previous + 1)}>
        加一
      </button>
      <button type="button" onClick={() => setCount((previous) => previous - 1)}>
        減一
      </button>
      <button type="button" onClick={() => setCount(0)}>
        歸零
      </button>
    </main>
  );
}
