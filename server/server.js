// https://bezkoder.com/node-js-express-sequelize-mysql/
// https://sequelize.org/master/manual/model-basics.html
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const listEndpoints = require('express-list-endpoints')

var corsOptions = {
  origin: `http://localhost:${process.env.APP_PORT}`,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
// You can use sequelize.sync() to automatically synchronize all models. Example:
// db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

require("./routes/tutorial.routes")(app);
require("./routes/website_list.routes")(app);

// simple route
app.get(`${process.env.BASE_URL}/`, (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(listEndpoints(app), null, 4));
  // res.json(listEndpoints(app));
  // res.end("Hi, selamat datang di nodejs");
});


app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}.`);
});
