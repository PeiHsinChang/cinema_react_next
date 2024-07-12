import react, { useRef, useEffect, useState } from "react";
// import styled from "styled-components";
import styles from "./scratchoff.module.scss";

// import photoImage from "StaticImg/member/to-app-ad@3x.jpg";
import cover from "../static/OnePiece/OnePieceCover.png";
import prizeImg from "../static/OnePiece/OnePiece1.jpeg";

// import picFault from "StaticImg/common/picFault.svg";

const Canvas = (props) => {
  const {
    id = "",
    initCanvas = () => {},
    onMouseMove = () => {},
    onMouseEnter = () => {},
    onTouchStart = () => {},
    onTouchMove = () => {},
  } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("Canvas-uesEffect", canvasRef.current);

    const canvas = canvasRef.current;

    canvas.width = "300";
    canvas.height = "150";

    console.log(canvas.id);

    if (canvas.id === "top") {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.fillStyle = "silver";
      context.fillRect(0, 0, 450, 380);
      console.log({ context });
      // context.drawImage(photoImage, 0, 0)
      const img = document.getElementById("cover");
      context.drawImage(img, 0, 0);

      context.globalCompositeOperation = "destination-out";
    }

    initCanvas(canvas);
  }, []);

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    onMouseMove(event, canvas);
  };

  const handleMouseEnter = (event) => {
    const canvas = canvasRef.current;
    onMouseEnter(event, canvas);
  };

  const handleTouchStart = (event) => {
    const canvas = canvasRef.current;
    onTouchStart(event, canvas);
  };

  const handleTouchMove = (event) => {
    const canvas = canvasRef.current;
    onTouchMove(event, canvas);

    if (event.changedTouches) {
      //     if (ev.changedTouches) {
      //       ev = ev.changedTouches[ev.changedTouches.length - 1]
      //     }
      //     var x = ev.pageX - this.offsetLeft
      //     var y = ev.pageY - this.offsetTop
      //     ctxTop.beginPath()
      //     ctxTop.arc(x, y, 10, 0, Math.PI * 2)
      //     ctxTop.fill()
      //     alertInfo()
    }
  };

  return (
    <canvas
      id={id}
      style={{ border: "1px solid blue" }}
      onTouchStart={(event) => {
        console.log(";pppp");
        handleTouchStart(event);
      }}
      onTouchMove={(event) => {
        console.log("zzzz", event);
        handleTouchMove(event);
      }}
      onMouseMove={(event) => handleMouseMove(event)}
      onMouseEnter={(event) => handleMouseEnter(event)}
      ref={canvasRef}
      // {...props}
    />
  );
};

const ScratchOff = () => {
  let ctx = {};
  ctx.globalCompositeOperation = "destination-out";

  let useNumber = 0,
    luckNumber = [],
    mousedown,
    w = 200,
    h = 100;

  // function drawBot() {
  //   //清除區域，為了點擊再來一次進行頁面重繪
  //   ctxBot.clearRect(0, 0, w, h)
  //   luckNumber.push(random())
  //   //fillText(填充)實心數字 改為strokeText(描邊)為空心數字
  //   ctxBot.fillText(luckNumber[luckNumber.length - 1], 70, 55)
  // }

  // //獲取1-1000隨機數
  // function random() {
  //   return Math.ceil(Math.random() * 1000)
  // }

  // function drawTop() {
  //   ctxTop.canvas.style.opacity = 1
  //   ctxTop.fillStyle = 'purple'
  //   ctxTop.fillRect(0, 0, w, h)

  //   //判斷當前是否為第一次刮開，不是則清除上一次區域
  //   if (ctxTop.globalCompositeOperation != 'destination-out') {
  //     ctxTop.globalCompositeOperation = 'destination-out'
  //   } else {
  //     ctxTop.clearRect(0, 0, w, h)
  //   }
  // }

  console.log("0000");

  //鼠標移動開始刮圖層
  useEffect(() => {
    console.log("useEffect");
    // console.log({ bottomCanvas })

    // drawBot()
    // drawTop()
    // topCanvas.addEventListener('touchstart', eventDown)
    // topCanvas.addEventListener('touchend', eventUp)
    // topCanvas.addEventListener('touchmove', eventMove)
    // topCanvas.addEventListener('mousedown', eventDown)
    // document.addEventListener('mouseup', eventUp)
    // topCanvas.addEventListener('mousemove', eventMove)
  }, []);

  // function eventDown(ev) {
  //   ev = ev || event
  //   ev.preventDefault()
  //   mousedown = true
  // }

  // function eventUp(ev) {
  //   ev = ev || event
  //   ev.preventDefault()
  //   mousedown = false
  // }

  // const eventMove=(ev) =>{
  //   ev = ev || event
  //   ev.preventDefault()
  //   if (mousedown) {
  //     if (ev.changedTouches) {
  //       ev = ev.changedTouches[ev.changedTouches.length - 1]
  //     }
  //     var x = ev.pageX - this.offsetLeft
  //     var y = ev.pageY - this.offsetTop
  //     ctxTop.beginPath()
  //     ctxTop.arc(x, y, 10, 0, Math.PI * 2)
  //     ctxTop.fill()
  //     alertInfo()
  //   }
  // }

  // 判斷刮開區域大於60%時，頂層canvas消失，顯示底層數據
  // function alertInfo() {
  //   var data = ctxTop.getImageData(0, 0, w, h).data
  //   var n = 0
  //   for (var i = 0; (i = data.length * 0.6); i++) {
  //     ctxTop.globalCompositeOperation = 'destination-over'
  //     ctxTop.canvas.style.opacity = 0
  //     document?.querySelector(button).style.display = block
  //     alert(luckNumber[luckNumber.length - 1])
  //   }
  // }

  //點擊再來一次進行頁面重繪next
  // function next() {
  //   useNumber++
  //   //判斷當前點擊次數
  //   if (useNumber > 2) {
  //     alert('今日抽獎次數用完啦~今日所抽號碼為' + luckNumber)
  //     document.querySelector(button).disabled = true
  //   } else {
  //     drawBot()
  //     drawTop()
  //   }
  // }

  const [getPrize, setGetPrize] = useState(false);

  const initBottomCanvas = (canvas) => {
    console.log({ canvas });
    const context = canvas.getContext("2d");
    context.font = "20px sans-serif";
    canvas.style.background = "gray";

    // context.fillText('恭喜獲得信義區豪宅', 50, 90) // ( text, positionX, positionY)
    const img = document.getElementById("prize");

    var wrh = img.width / img.height;
    var newWidth = canvas.width;
    var newHeight = newWidth / wrh;
    if (newHeight > canvas.height) {
      newHeight = canvas.height;
      newWidth = newHeight * wrh;
    }
    var xOffset = newWidth < canvas.width ? (canvas.width - newWidth) / 2 : 0;
    var yOffset =
      newHeight < canvas.height ? (canvas.height - newHeight) / 2 : 0;

    context.drawImage(img, xOffset, yOffset, newWidth, newHeight);
  };

  const scratchEvent = (event, canvas) => {
    console.log("scratchEvent", canvas, event);
    const context = canvas.getContext("2d");
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fill();
  };

  const getPrizeEvent = (event, canvas) => {
    if (!getPrize) {
      console.log("getPrizeEvent");

      setGetPrize(true);
      // fetchAPI here
    }
    const context = canvas.getContext("2d");
  };

  const scratchEventOnTouchMove = (event, canvas) => {
    const position = document.getElementById("wrapper");
    position.ontouchmove;
    console.log({ position });
  };

  useEffect(() => {
    console.log(333);
  });

  console.log(cover);
  return (
    <>
      <img
        id="cover"
        style={{ display: "none" }}
        src={cover.src}
        alt="coverImage"
      />
      <img
        id="prize"
        // width="300"
        // height="150"
        style={{ display: "none" }}
        src={prizeImg.src}
        alt="prize"
      />
      <div id={"wrapper"} className={styles.wrapper} width="300" height="150">
        <Canvas id={"bottom"} initCanvas={initBottomCanvas} />
        <Canvas
          id={"top"}
          onMouseMove={scratchEvent}
          onMouseEnter={getPrizeEvent}
          onTouchMove={scratchEventOnTouchMove}
        />
        {/* 温馨提示：每人每天三次刮刮樂機會~ */}

        {/* <div id="btn">
        <button
        // onClick={next}
        >
          再來一次
        </button>
      </div> */}
      </div>
    </>
  );
};

export default ScratchOff;

// const Wrapper = styled.div`
//   position: relative;
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
//   border: 1px solid red;
//   width: 300px;
//   height: 150px;
//   canvas {
//     position: absolute;
//     top: 0;
//     left: 0;
//     cursor: pointer;
//   }

//   #btn {
//     margin-top: 20%;
//     text-align: center;
//   }
//   #btn button {
//     font-size: 20px;
//     color: #fff;
//     background: #169bd5;
//     border-color: #169bd5;
//     border-radius: 5px;
//     padding: 5px 20px;
//     display: none;
//     margin: 0 auto 10px;
//   }
//   img {
//     width: 200px;
//     height: 100px;
//     display: none;
//   }
// `;
