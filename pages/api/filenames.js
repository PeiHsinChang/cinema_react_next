const path = require("path");
const fs = require("fs");

const imagePath = path.join(path.resolve(), "/static/OnePiece");
let files = [];
fs.readdirSync(imagePath).forEach((name) => {
  if (".DS_Store" !== name && "OnePieceCover.png" !== name) files.push(name);
});

export default function handler(req, res) {
  res.status(200).json(files);
}
