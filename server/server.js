// https://bezkoder.com/node-js-express-sequelize-mysql/
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

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

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get(`${process.env.BASE_URL}/`, (req, res) => {
  res.json({ message: "Welcome to my application." });
});

require("./routes/tutorial.routes")(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}.`);
});
