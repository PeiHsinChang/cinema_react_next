import React, { useEffect, useState } from "react";
import styles from "./PuzzleGame.module.scss";

const Boxes = ({ boxCount, clickCount, onClick, boxNumbers }) => {
  let boxes = [];
  const BoxComponent = ({ index }) => {
    return (
      <div
        id={`box${index}`}
        className={styles.box}
        onClick={(e) => {
          document.getElementById(e.target.id).innerHTML = clickCount;
          console.log("index", index);
          onClick(e, index);
          console.log("ddd", boxNumbers);
        }}
      >
        {boxNumbers?.[index]}
      </div>
    );
  };
  for (let i = 0; i < boxCount; i++) {
    boxes.push(<BoxComponent index={i} key={`box${i}`}></BoxComponent>);
  }
  return boxes;
};

const PuzzleGame = () => {
  let boxCount = Math.pow(3, 2);
  let initialBoxNumbers = () => {
    console.log("eeeeee");
    let initialBoxNumberArray = [];
    for (let i = 0; i < boxCount; i++) {
      initialBoxNumberArray.push(0);
    }
    return initialBoxNumberArray;
  };
  const [clickCount, setClickCount] = useState(0);
  const [clickBoxId, setClickBoxId] = useState(0);
  const [boxNumbers, setBoxNumbers] = useState(initialBoxNumbers);

  useEffect(() => {
    if (clickBoxId) {
      console.log(document.getElementById(clickBoxId));
      document.getElementById(clickBoxId).innerHTML = clickCount;
    }
  }, [clickCount, clickBoxId]);
  return (
    <div>
      map
      <Boxes
        boxCount={boxCount}
        clickCount={clickCount}
        boxNumbers={boxNumbers}
        onClick={(e, index, boxNumbers) => {
          console.log("e", e);
          console.log("index2222", boxNumbers);
          setClickBoxId(e.target.id);
          setClickCount(clickCount + 1);

          setBoxNumbers(boxNumbers?.[index]);
        }}
      />
    </div>
  );
};

export default PuzzleGame;
