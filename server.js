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


app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});


let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});