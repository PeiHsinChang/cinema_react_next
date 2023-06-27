import React, { useState } from "react";
import styles from "./uploadFile.module.scss";

import XlsxPopulate from "xlsx-populate";

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

const DragFile = () => {
  const [primary, setPrimary] = useState(0);
  const [secondary, setSecondary] = useState(0);
  const [password, setPassword] = useState("");
  const [xlsxFile, setXlsxFile] = useState(null);
  const [data, setData] = useState([]);
  const [sheet, setSheet] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setXlsxFile(file);
  };

  console.log({ xlsxFile });
  const readxlsFileFunc2 = async (primary, secondary) => {
    if (xlsxFile === null) {
      alert("請選擇檔案");
      return;
    }
    let list = [];
    await XlsxPopulate.fromDataAsync(xlsxFile, {
      password: password,
    })
      .then((data) => {
        const sheet = data.sheet(sheet);
        console.log(data);
        const range = sheet.usedRange();
        const values = range.value();

        const count = primary + secondary;
        list = drawLot(count, values);
        setData(list);
      })
      .catch((err) => {
        console.log(err, password);
        alert("請輸入密碼");
        return err;
      });
  };

  const pList = data.splice(0, primary);

  return (
    <div>
      Hello xlsxFile
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
        <div>
          頁籤名稱
          <input value={sheet} onChange={(e) => setSheet(e.target.value)} />
        </div>
        <label>
          <div className={styles.button}>
            import
            <input
              type="file"
              style={{ display: "none" }}
              accept=".xlsx"
              onChange={handleFileUpload}
            />
            {xlsxFile && <p>已選擇文件：{xlsxFile.name}</p>}
          </div>
        </label>
        <div>
          密碼
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="button"
          value="開始抽籤"
          onClick={() =>
            readxlsFileFunc2(parseInt(primary), parseInt(secondary))
          }
        />
      </form>
      <div>
        正取
        {pList.map((item, index) => {
          return <div key={"p" + index}>{item}</div>;
        })}
        備取
        {data.map((item, index) => {
          return <div key={"s" + index}>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default DragFile;
