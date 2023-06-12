console.log("readFile");

const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");

export default function handler(req, res) {
  console.log(Object.keys(req));
  let path = req.file.path;
  console.log(path);

  // console.log(req.body);

  res.status(200).json("OK");
}
