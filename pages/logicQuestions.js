import React, { useEffect, useState } from "react";
import styles from "./logicQuestions.module.scss";

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
  const [questionInde, setQuestionIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div>第{data[questionInde].question_id}題</div>
      <div>{data[questionInde].question}</div>
      {data[questionInde].answers.map((item, index) => {
        console.log(item);

        return (
          <div
            key={index}
            onClick={() => {
              const isCorrect =
                (index + 1).toString() === data[questionInde].answer;
              const isFinish = questionInde + 1 === data.length;

              if (isCorrect) {
                setQuestionIndex(questionInde + 1);
                if (isFinish) {
                  alert("恭喜你都答對了！笨胖！");
                  setQuestionIndex(0);
                }
              } else {
                alert("incorrect!");
              }
              console.log(isFinish, questionInde + 1, data.length);
            }}
          >{`${index + 1} ${item}`}</div>
        );
      })}
    </div>
  );
};

export default LogicQuestions;
