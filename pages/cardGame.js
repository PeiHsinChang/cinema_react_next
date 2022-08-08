import { useEffect, useState } from "react";
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

const Cards = ({ data }) => {
  const [cardClassName, setCardClassName] = useState(`${styles.card}`);
  const [cardsData, setCardsData] = useState([]);

  console.log("Cards", data);
  const clickCard = (value) => {
    console.log(value.target.dataset.value);
    setCardClassName((cardClassName += ` ${styles.clickCard}`));
  };
  const card = (data, index) => (
    <div
      key={index}
      className={cardClassName}
      onClick={(e) => clickCard(e)}
      data-value={data.value}
    >
      {data.value}
    </div>
  );
  return data.map((item, index) => card(item, index));
};
function cardGame({ data }) {
  console.log("cardGame", data);
  return (
    <div className={styles.container}>
      <Cards data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();
  let data = [{ value: 1 }, { value: 2 }, { value: 3 }];
  let data2 = [...data, ...data];

  data2.sort(() => {
    return 0.5 - Math.random();
  });
  console.log(data2);

  // Pass data to the page via props
  return { props: { data: data2 } };
}

export default cardGame;
