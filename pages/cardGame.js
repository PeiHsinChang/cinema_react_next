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

const Cards = ({ data }) => {
  const [cardsData, setCardsData] = useState(data);
  const [openCardsCount, setOpenCardsCount] = useState(0);
  const [matchValue, setMatchValue] = useState("");
  const [selectData, setSelectData] = useState([]);

  const cardClassName = styles.card;
  const clickCardStyle = styles.clickCard;

  useEffect(() => {
    if (selectData.length === 2) {
      // setOpenCardsCount(0);

      /** 1. 先filter isOpen = true
       *  2. 是否match? isMatch的style: isOpen的style */
      const isMatchCards = selectData.every((item) => item === matchValue);
      console.log("isMatchCards", isMatchCards);
      setMatchValue("");

      cardsData
        .filter((item) => item.isOpen)
        .map((item) => {
          isMatchCards ? (item.isMatch = true) : (item.isOpen = false);
          // matchValue ? "" : (item.isOpen = false);
          return {
            ...item,
          };
        });
      console.log("selectData", selectData);
      setSelectData([]);
      // cardsData.filter((item) => (item.isOpen = false));
    }
  }, [cardsData, selectData]);

  const clickCard = (data) => {
    const { cardIndex, value } = data.target.dataset;
    const cardData = cardsData[parseInt(cardIndex)];
    cardData.isOpen = true;
    /** setCardsData不可以使用直接放cardsData，要[...cardsData] */
    setCardsData([...cardsData]);

    // setOpenCardsCount((openCardsCount += 1));
    selectData.push(value);
    setSelectData(selectData);
    if (selectData.length == 1) setMatchValue(value);
  };

  const card = (data, index) => {
    return (
      <div
        key={index}
        className={`${cardClassName} ${data.isOpen ? clickCardStyle : ""}`}
        onClick={(e) => (data.isOpen ? () => {} : clickCard(e))}
        data-value={data.value}
        data-card-index={index}
      >
        {data.value}
      </div>
    );
  };

  return cardsData.map((item, index) => card(item, index));
};

function cardGame({ data }) {
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
  let data = [
    { value: 1, isOpen: false, isMatch: false },
    { value: 2, isOpen: false, isMatch: false },
    { value: 3, isOpen: false, isMatch: false },
  ];
  let data2 = [...data, ...data];

  data2.sort(() => {
    return 0.5 - Math.random();
  });

  // Pass data to the page via props
  return { props: { data: data2 } };
}

export default cardGame;
