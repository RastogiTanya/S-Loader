const multer = require("multer");


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

var upload_middleware = multer({ storage: storage });
module.exports = upload_middleware;