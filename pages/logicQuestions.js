import React, { useEffect, useState } from "react";
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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  useEffect(() => {
    const modalAlert = document.getElementById("modalAlert");
    if (isOpenModal) {
      modalAlert.style.display = "block";
    } else {
      modalAlert.style.display = "none";
    }
  }, [isCorrect, isOpenModal]);

  const choiceAnswer = (index) => {
    const isFinish = questionIndex + 1 === data.length;
    setIsOpenModal(true);
    setIsCorrect(
      (index + 1).toString() === data[questionIndex].answer ? true : false
    );

    if (isCorrect && isFinish) {
      setAlertContent("恭喜你都答對了！");
    }
  };
  const closeModalAlert = () => {
    const isFinish = questionIndex + 1 === data.length;
    setIsOpenModal(false);
    if (isCorrect) {
      setQuestionIndex((prevState) => {
        return prevState + 1;
      });
    }
    if (isFinish) {
      setAlertContent("");
      setQuestionIndex(0);
    }
  };
  console.log("questionIndex", questionIndex);
  return (
    <div className={styles.container}>
      <div className={styles.alertModal} id="modalAlert">
        <div className={styles.alertBox}>
          <div className={styles.icon}>
            <Image
              src={isCorrect ? Correct : Error}
              alt="littlewoman"
              layout="responsive"
            />
          </div>
          <div className={styles.alertContent}>{alertContent}</div>
          <div className={styles.button} onClick={closeModalAlert}>
            {isCorrect ? "下一題" : "重新作答"}
          </div>
        </div>
      </div>
      <div className={styles.questionBlock}>
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
      </div>
    </div>
  );
};

export default LogicQuestions;
