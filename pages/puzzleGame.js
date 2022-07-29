import React, { useEffect, useState } from "react";
import styles from "./PuzzleGame.module.scss";

const Boxes = ({ boxCount, onClick, boxNumbers }) => {
  let boxes = [];
  const BoxComponent = ({ index }) => {
    return (
      <div
        id={`box${index}`}
        className={`${styles.box} `}
        onClick={(e) => onClick(e, index)}
      >
        {boxNumbers[index] ? boxNumbers[index] : ""}
      </div>
    );
  };

  for (let i = 0; i < boxCount; i++) {
    boxes.push(<BoxComponent index={i} key={`box${i}`} />);
  }
  return boxes;
};

const initialArray = (number) => {
  let initialBoxNumberArray = [];
  for (let i = 0; i < number; i++) {
    initialBoxNumberArray.push(0);
  }
  return initialBoxNumberArray;
};

const PuzzleGame = () => {
  let num = 3;
  let boxCount = Math.pow(num, 2);

  const [clickCount, setClickCount] = useState(0);
  const [clickBoxId, setClickBoxId] = useState(0);
  const [boxNumbers, setBoxNumbers] = useState(initialArray(boxCount));
  const [columnSum, setColumnSum] = useState(initialArray(num));
  const [rowSum, setRowSum] = useState(initialArray(num));

  useEffect(() => {
    /** 直的加總 */
    const newColumnSum = boxNumbers.reduce(
      (accum, item, index, array) => {
        if (parseInt(index / 3) === 0) {
          accum[index % 3] += item;
        } else {
          if (accum[index % 3] && item) {
            accum[index % 3] += item;
          } else {
            accum[index % 3] = 0;
          }
        }
        return accum;
      },
      [0, 0, 0]
    );
    setColumnSum(newColumnSum);

    /** 橫的加總 */
    const newRowSum = boxNumbers.reduce(
      (accum, item, index, array) => {
        if (index % 3 === 0) {
          accum[parseInt(index / 3)] += item;
        } else {
          if (accum[parseInt(index / 3)] && item) {
            accum[parseInt(index / 3)] += item;
          } else {
            accum[parseInt(index / 3)] = 0;
          }
        }
        return accum;
      },
      [0, 0, 0]
    );
    setRowSum(newRowSum);

    return () => {
      console.log("unmounted");
    };
  }, [clickCount, clickBoxId]);

  return (
    <div className={styles.container}>
      <div className={styles.containerByRow}>
        <div className={styles.boxWrapper}>
          {boxNumbers.map((item, boxIndex) => {
            return (
              <div
                id={`box${boxIndex}`}
                className={`${styles.box}`}
                key={`box${boxIndex}`}
                onClick={(e) => {
                  setClickBoxId(e.target.id);
                  if (!boxNumbers[boxIndex]) {
                    setClickCount(clickCount + 1);
                    boxNumbers[boxIndex] = clickCount + 1;
                  }
                  setBoxNumbers(boxNumbers);
                }}
              >
                <div className={`${styles.yellow}`}>{item ? item : ""}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.rowSumWrapper}>
          {rowSum.map((item, rowSumIndex) => {
            return (
              <div
                id={`rowSum${rowSumIndex}`}
                key={`rowSum${rowSumIndex}`}
                className={`${styles.box} ${styles.orange}`}
              >
                <div className={`${styles.orange}`}>{item ? item : ""}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.containerByRow}>
        <div className={styles.columnSumWrapper}>
          {columnSum.map((item, columnSumIndex) => {
            return (
              <div
                id={`columnSum${columnSumIndex}`}
                key={`columnSum${columnSumIndex}`}
                className={styles.box}
              >
                <div className={`${styles.green}`}>{item ? item : ""}</div>
              </div>
            );
          })}
          <div className={styles.box}></div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleGame;
