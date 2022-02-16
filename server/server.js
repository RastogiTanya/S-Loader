require('dotenv').config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const initRoutes = require("./src/routes/files.routes");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
initRoutes(app);


let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});