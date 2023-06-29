import React, { useState } from "react";
import styles from "./uploadFile.module.scss";
import readXlsxFile from "read-excel-file";

// 從抽籤池中隨機選擇指定數量的項目
function drawLot(numItems, rows) {
  if (numItems <= rows.length) {
    let selectedItems = [];
    for (let i = 0; i < numItems; i++) {
      let randomIndex = Math.floor(Math.random() * rows.length);
      let selectedItem = rows[randomIndex];
      console.log({ rows });
      // 標記已選項目
      rows.splice(randomIndex, 1);

      selectedItems.push(selectedItem);
    }

    return selectedItems;
  } else {
    return "抽籤池中的項目數量不足";
  }
}

const UploadFile = (porps) => {
  const [primary, setPrimary] = useState(0);
  const [secondary, setSecondary] = useState(0);
  const [data, setData] = useState([]);

  const readxlsFileFunc = async (primary, secondary) => {
    try {
      if (typeof document !== "undefined") {
        // Manipulating the DOM here
        let fileInput = document?.getElementById("fileToUpload");
        let file = fileInput.files[0];
        let list = [];
        await readXlsxFile(file).then((rows) => {
          const count = primary + secondary;
          list = drawLot(count, rows);
          setData(list);
          // `rows` is an array of rows
          // each row being an array of cells.
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const pList = data.splice(0, primary);
  // console.log({ pList });

  const readCsvFileFunc = (primary, secondary) => {
    const csvFile = document.getElementById("csvToUpload");
    console.log(csvFile);
    const input = csvFile.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      const data = text.split("\n");
      const count = primary + secondary;

      const list = drawLot(count, data);
      list.unshift(",正取");
      console.log("unshift", { list }, primary);
      list.splice(primary + 1, 0, "備取");
      console.log({ list });
      setData(list);

      let csvContent =
        "data:text/csv;charset=utf-8," + list.map((e) => (e += "\n"));
      console.log({ csvContent });
      // document.write(text);
      let encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    };
    reader.readAsText(input);
  };

  return (
    <>
      {/* 只接受xlsx */}
      <div>
        只接受xlsx
        <form encType="multipart/form-data">
          <div>
            正取
            <input
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
            />
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
              upload xlsxFile
              <input
                type="file"
                id="fileToUpload"
                accept=".xlsx"
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
        {/* <div>
          正取
          {pList.map((item, index) => {
            return <div key={"p" + index}>{item}</div>;
          })}
          備取
          {data.map((item, index) => {
            return <div key={"s" + index}>{item}</div>;
          })}
        </div> */}
      </div>
      {/* 只接受csv */}
      <div>
        只接受csv
        <form encType="multipart/form-data">
          <div>
            正取
            <input
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
            />
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
              upload csvFile
              <input
                type="file"
                id="csvToUpload"
                accept=".csv"
                style={{ display: "none" }}
                onChange={(e) => console.log(e)}
              />
            </div>
          </label>
          <input
            type="button"
            value="開始抽籤"
            onClick={() =>
              readCsvFileFunc(parseInt(primary), parseInt(secondary))
            }
          />
        </form>
        {/* <div>
          正取
          {pList.map((item, index) => {
            return <div key={"p" + index}>{item}</div>;
          })}
          備取
          {data.map((item, index) => {
            return <div key={"s" + index}>{item}</div>;
          })}
        </div> */}
      </div>
    </>
  );
};

export default UploadFile;
