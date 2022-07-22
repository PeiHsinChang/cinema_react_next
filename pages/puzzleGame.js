import React, { useEffect, useState } from "react";
import styles from "./PuzzleGame.module.scss";

const Boxes = ({ boxCount, clickCount, onClick }) => {
  let boxes = [];

  const BoxComponent = ({ index }) => {
    return (
      <div
        id={`box${index}`}
        className={styles.box}
        onClick={(e) => {
          document.getElementById(e.target.id).innerHTML = clickCount;
          onClick();

          console.log(document.getElementById(e.target.id).innerHTML);
        }}
      >
        {/* {clickCount} */}
      </div>
    );
  };
  for (let i = 1; i <= boxCount; i++) {
    boxes.push(<BoxComponent index={i} key={`box${i}`}></BoxComponent>);
  }
  return boxes;
};

const PuzzleGame = () => {
  const [clickCount, setClickCount] = useState(0);
  let boxCount = Math.pow(3, 2);

  return (
    <div>
      map
      <Boxes
        boxCount={boxCount}
        clickCount={clickCount}
        onClick={() => setClickCount(clickCount + 1)}
      />
    </div>
  );
};

export default PuzzleGame;
