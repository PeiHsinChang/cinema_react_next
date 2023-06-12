import react, { useState } from "react";
import styles from "./dragFile.module.scss";

import readXlsxFile from "read-excel-file";

// 從抽籤池中隨機選擇指定數量的項目
function drawLot(numItems, rows) {
  if (numItems <= rows.length) {
    let selectedItems = [];
    for (let i = 0; i < numItems; i++) {
      let randomIndex = Math.floor(Math.random() * rows.length);
      let selectedItem = rows[randomIndex];

      // 標記已選項目
      rows.splice(randomIndex, 1);

      selectedItems.push(selectedItem);
    }

    return selectedItems;
  } else {
    return "抽籤池中的項目數量不足";
  }
}

const DragFile = (porps) => {
  const [primary, setPrimary] = useState(0);
  const [secondary, setSecondary] = useState(0);

  const readxlsFileFunc = async (primary, secondary) => {
    try {
      // if (!document) return;

      if (typeof document !== "undefined") {
        let element = document.querySelector(".class-name");

        // Manipulating the DOM here
        let fileInput = document?.getElementById("fileToUpload");
        let file = fileInput.files[0];
        let list = [];
        await readXlsxFile(file).then((rows) => {
          console.log({ rows });
          const count = primary + secondary;
          console.log({ count });

          list = drawLot(count, rows);
          console.log(list);
          // `rows` is an array of rows
          // each row being an array of cells.

          // return;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Hello DragFile
      <form encType="multipart/form-data">
        <div>
          正取
          <input value={primary} onChange={(e) => setPrimary(e.target.value)} />
        </div>
        <div>
          備取
          <input
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
          />
        </div>
        <label>
          <div className={styles.button}>
            import
            <input
              type="file"
              id="fileToUpload"
              style={{ display: "none" }}
              onChange={(e) => console.log(e)}
            />
          </div>
        </label>
        <input
          type="button"
          value="開始抽籤"
          onClick={() =>
            readxlsFileFunc(parseInt(primary), parseInt(secondary))
          }
        />
      </form>
    </div>
  );
};

export default DragFile;
