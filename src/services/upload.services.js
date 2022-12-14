const multer = require("multer");
const util = require("util");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");
const path = require("path");
require("dotenv").config();
// folder = process.env.UPLOAD_DEST;
var currentPath = path.join(process.cwd(), "/src/uploads/images");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(currentPath, { recursive: true })
    cb(null, currentPath);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: { fileSize: maxSize },
}).single("file");

let uploadNow = util.promisify(uploadFile);

module.exports = uploadNow;
