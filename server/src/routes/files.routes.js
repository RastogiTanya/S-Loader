const express = require("express");
const router = express.Router();
const excelController = require("../controllers/excel.controller");
const upload_middleware = require("../middlewares/upload");


let routes = (app) => {
  app.use("/api/excel", router);
  router.post("/upload", upload_middleware.array("files", 5), excelController.acknowledger);
  router.post("/to-database", excelController.uploader);
};


module.exports = routes;