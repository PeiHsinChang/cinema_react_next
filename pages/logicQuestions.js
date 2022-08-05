import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import styles from "./logicQuestions.module.scss";
import Correct from "../static/correct.svg";
import Error from "../static/error.svg";

const data = [
  {
    question_id: 1,
    question:
      "B排士兵向敵軍進攻時被敵人消滅了，也許B排只有一個叫史密斯的士兵在基地醫院身體康復了，所以，",
    answer: "4",
    answers: [
      "B排的其他人都被消滅了。",
      "B排的所有人都被消滅了。",
      "B排的所有人不見得都被消滅了。",
      "以上皆非",
    ],
  },
  {
    question_id: 2,
    question: "有時印第安人是阿拉斯加人，阿拉斯加人有時是律師，所以，",
    answer: "1",
    answers: [
      "有時印第安人不見得一定是阿拉斯加人的律師",
      "印第安人不可能是阿拉斯加人的律師",
    ],
  },
  {
    question_id: 3,
    question:
      "只要X等於紅色，Y就一定等於綠色；只要Y不等於綠色，Z就一定等於藍色。但是，當X等於紅色時，Z絕不會等於藍色，所以，",
    answer: "3",
    answers: [
      "只要Z等於藍色，Y就可能是綠色。",
      "只要Y不等於紅色，Z就可能不是藍色",
      "只要Y不等於綠色，X就不可能是紅色。",
    ],
  },
  {
    question_id: 4,
    question:
      "我住在喬的農場和城市之間的那個地方。喬的農場位於城市和機場之間，所以，",
    answer: "3",
    answers: [
      "喬的農場到我住處的距離比到機場要近。",
      "我住在喬的農場和機場之間。",
      "我的住處到喬的農場的距離比到機場要近。",
    ],
  },
  {
    question_id: 5,
    question:
      "你正在開車行駛，如果你突然停車，跟在後面的一輛卡車將撞上你的車。如果你不這麼做，你將撞倒一個過馬路的婦女，所以，",
    answer: "4",
    answers: [
      "行人不應在馬路上行走。",
      "那輛卡車車速太快。",
      "你要嘛被後面那輛卡車撞上，要嘛撞倒那個婦女。",
      "以上皆非",
    ],
  },
];

const LogicQuestions = () => {
  const [page, setPage] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [isFinish, setIsFinish] = useState(false);

  /** 領取獎勵 */
  const [getGift, setGetGift] = useState(false);

  const refs = useRef(null);
  useEffect(() => {
    setIsFinish(questionIndex + 1 === data.length);
    const modalAlert = document.getElementById("modalAlert");
    if (isOpenModal) {
      modalAlert.style.display = "flex";
    } else {
      modalAlert.style.display = "none";
    }

    if (isCorrect && isFinish) {
      setAlertContent("恭喜你都答對了！");
    }

    const handleTransitionEnd = (e) => {
      e.target.style.opacity = "1";
    };

    if (refs) {
      const refsList = Object.keys(refs);
      refsList.pop(1);
      /** animation 出場時間 */
      refsList.forEach((item) => {
        refs.current = refs[item];
        if (refs.current?.style) {
          refs.current.addEventListener("animationend", handleTransitionEnd);
        }
      });
    }

    return () => {
      const refsList = Object.keys(refs);
      refsList.pop(1);
      /** animation 出場時間卸載animationend */
      refsList.forEach((item) => {
        refs.current = refs[item];
        if (refs.current?.style) {
          refs.current.removeEventListener("animationend", handleTransitionEnd);
        }
      });
    };
  }, [isCorrect, isOpenModal, page, refs]);

  const choiceAnswer = (index) => {
    setIsOpenModal(true);
    setIsCorrect(
      (index + 1).toString() === data[questionIndex].answer ? true : false
    );
  };

  const closeModalAlert = () => {
    /** 1. 關閉modal 2.重新 */
    setIsOpenModal(false);
    if (isCorrect) {
      setQuestionIndex((prevState) => {
        return prevState + 1;
      });
    }
    if (isCorrect && isFinish) {
      setAlertContent("");
      setQuestionIndex(0);
      setGetGift(true);
      setPage(page + 1);
    }
    setIsCorrect(false);
  };

  let pageContent = null;
  switch (page) {
    case 1:
      pageContent = (
        <div className={styles.button} onClick={() => setPage(page + 1)}>
          開始挑戰
        </div>
      );
      break;
    case 2:
      pageContent = (
        <>
          <div className={styles.page2Content}>
            {data &&
              data.map((item, index) => {
                const delay = index;
                return (
                  <div
                    key={index}
                    style={{ animationDelay: `${delay}s` }}
                    className={`${styles.card} `}
                    ref={(el) => (refs[index] = el)}
                  >
                    <div>{item.question}</div>
                    <div>{item.answers[parseInt(item.answer) - 1]}</div>
                  </div>
                );
              })}
          </div>
          <div className={styles.button} onClick={() => setPage(page + 1)}>
            開始作答
          </div>
        </>
      );
      break;
    case 3:
      pageContent = (
        <>
          <div className={styles.question}>
            <span>Q{data[questionIndex].question_id}.</span>
            {data[questionIndex].question}
          </div>
          <div className={styles.answers}>
            {data[questionIndex].answers.map((item, index) => {
              return (
                <div
                  className={styles.answer}
                  key={index}
                  onClick={() => choiceAnswer(index)}
                >{`${index + 1}. ${item}`}</div>
              );
            })}
          </div>
        </>
      );
      break;
    case 4:
      pageContent = (
        <div
          className={`${styles.button} ${getGift ? styles.unClick : null}`}
          onClick={getGift ? () => {} : () => setGetGift(true)}
        >
          {getGift ? "已領取獎勵" : "領取獎勵"}
        </div>
      );
      break;

    default:
      pageContent;
  }

  const closeModal = (e) => {
    if (isCorrect) {
      setQuestionIndex((prevState) => {
        return prevState + 1;
      });
    }
    if (isCorrect && isFinish) {
      setAlertContent("");
      // setGetGift(true);
      setPage(page + 1);
    }
    setIsCorrect(false);
    setIsOpenModal(false);
  };
  console.log("render");

  return (
    <div className={styles.container}>
      <div
        className={styles.alertModal}
        id="modalAlert"
        onClick={(e) => closeModal(e)}
      >
        <div className={styles.alertBox} onClick={(e) => e.stopPropagation()}>
          <div className={styles.icon}>
            <Image
              src={isCorrect ? Correct : Error}
              alt="littlewoman"
              layout="responsive"
            />
          </div>
          <div className={styles.alertContent}>
            {alertContent ? alertContent : ""}
          </div>
          <div className={styles.button} onClick={closeModalAlert}>
            {isCorrect ? (isFinish ? "領取獎勵！" : "下一題") : "重新作答"}
          </div>
        </div>
      </div>
      <div className={styles.questionBlock}>{pageContent}</div>
    </div>
  );
};

export default LogicQuestions;
