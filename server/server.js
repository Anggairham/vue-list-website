// https://bezkoder.com/node-js-express-sequelize-mysql/
// https://sequelize.org/master/manual/model-basics.html
require('dotenv').config();
const express = require("express");
// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const listEndpoints = require('express-list-endpoints')

var whitelist = ['https://anggairham.github.io','http://localhost:8080'];
var corsOptions = {
//  origin : '*',
//   origin: `http://localhost:${process.env.APP_PORT}`,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  "preflightContinue": false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Enabling CORS Pre-Flight
// app.options('*', cors()) // include before other routes

const db = require("./models");
// https://sequelize.org/master/manual/model-basics.html#dropping-tables
// User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
// User.sync({ force: true }) - This creates the table, dropping it first if it already existed
// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("Alter.");
// });

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
