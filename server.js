require('dotenv').config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const initRoutes = require("./src/routes/files.routes");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
initRoutes(app);


if(process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});