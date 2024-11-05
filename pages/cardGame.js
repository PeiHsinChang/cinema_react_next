import { useEffect, useState, useRef } from "react";
import styles from "./cardGame.module.scss";
import { server } from "../config";

/** 快速排序法
 * https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-06-js-%E8%AB%8B%E4%BD%A0%E5%9C%A8%E6%97%81%E9%82%8A%E7%9A%84%E7%99%BD%E6%9D%BF%E5%AF%AB%E5%80%8B%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E6%BC%94%E7%AE%97%E6%B3%95-8d8ad4903b1c
 */
function quickSort(arr) {
  if (arr.length < 2) return arr;
  const [p, ...ary] = arr;
  const left = [],
    right = [];

  ary.forEach((c) => {
    if (c < p) left.push(c);
    else right.push(c);
  });
  return [...quickSort(left), p, ...quickSort(right)];
}

// const test = quickSort([48, 44, 22, 99, 77, 32]);

const Card = ({ item, index, clickCard, selectedItemsIs2 }) => {
  const clickCardStyle = styles.clickCard;

  return (
    <div
      key={index}
      className={`${styles.card} ${item.isOpen ? clickCardStyle : ""} ${
        item.isMatch ? styles.matchStyle : ""
      }`}
      onClick={(e) => (item.isOpen || selectedItemsIs2 ? "" : clickCard(e))}
    >
      <div
        className={styles.front}
        data-value={item.value}
        data-card-index={index}
      />
      <div className={styles.back}>
        {/* 暫時不用 next 優化的Image */}
        <img src={`/static/OnePiece/${item.filename}`} alt={item.filename} />
      </div>
    </div>
  );
};

function cardGame({ data }) {
  const [cardsData, setCardsData] = useState(data);
  const [selectData, setSelectData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  let setNewCardsData;

  useEffect(() => {
    if (selectData.length === 2) {
      /** 1. 先filter isOpen = true
       *  2. 是否match ? isMatch的style: 重新開始 */
      setTimeout(() => {
        const isMatchCards = selectData[0] === selectData[1];
        setNewCardsData = JSON.parse(JSON.stringify(cardsData));

        setNewCardsData.map((item) => {
          if (item.isOpen) {
            if (isMatchCards) {
              item.isMatch = true;
            } else if (item.isMatch) {
            } else {
              item.isMatch = false;
              item.isOpen = false;
            }
            // 原: 一選錯，即重選
            // else {
            //   item.isMatch = false;
            //   item.isOpen = false;
            // }
          }
        });

        setCardsData(setNewCardsData);
        setSelectData([]);
      }, 1000);
    }
    // const allMatches = setNewCardsData.every((item) => item.isMatch);
    const allMatches = selectData.every((item) => item.isMatch);

    if (allMatches) {
      console.log({ allMatches });
      setOpenModal(true);
    }
  }, [selectData]);

  const clickCard = (data) => {
    const { cardIndex, value } = data.target.dataset;
    /** Deep Copy */
    setNewCardsData = JSON.parse(JSON.stringify(cardsData));
    const setNewCardData = setNewCardsData[parseInt(cardIndex)];
    setNewCardData.isOpen = true;
    setCardsData(setNewCardsData);

    let newSelectData = JSON.parse(JSON.stringify(selectData));
    newSelectData.push(value);
    setSelectData(newSelectData);
  };

  const closeModal = (e) => {
    // setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.playground}>
        {cardsData.map((item, index) => (
          <Card
            key={index}
            item={item}
            index={index}
            clickCard={clickCard}
            selectedItemsIs2={selectData.length === 2}
          />
        ))}
      </div>
      <div
        className={styles.alertModal}
        id="modalAlert"
        onClick={(e) => closeModal(e)}
      />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  const res = await fetch(`${server}/api/filenames`);
  const filenames = await res.json();
  filenames.sort(() => 0.5 - Math.random());
  const newFilenames = filenames.slice(0, 8);
  let data = newFilenames.map((filename, index) => {
    return { value: index, filename: filename, isOpen: false, isMatch: true };
  });

  let data2 = [...data, ...data];

  data2.sort(() => {
    return 0.5 - Math.random();
  });

  // Pass data to the page via props
  return { props: { data: data2 } };
}

export default cardGame;
