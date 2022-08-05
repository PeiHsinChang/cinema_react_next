import styles from "./cardGame.module.scss";

function quickSort(arr) {
  if (arr.length < 2) return arr;
  const [p, ...ary] = arr;
  console.log(p, ary);
  const left = [],
    right = [];

  ary.forEach((c) => {
    if (c < p) left.push(c);
    else right.push(c);
  });
  console.log("return", [left, p, right]);
  return [...quickSort(left), p, ...quickSort(right)];
}

const test = quickSort([48, 44, 22, 99, 77, 32]);
console.log("test", test);

const data = [{ value: 1 }, { value: 2 }, { value: 3 }];
const data2 = [...data, ...data];

// var arr = [4, 1, 67, 12, 45, 121, 3];
data2.sort(function () {
  return 0.5 - Math.random();
});
console.log(data2);

const card = <div className={styles.card}>1</div>;
const Cards = () => {
  // return data2.map((item) => card);
  return card;
};
const cardGame = () => {
  return (
    <div className={styles.container}>
      <Cards />
    </div>
  );
};

export default cardGame;
