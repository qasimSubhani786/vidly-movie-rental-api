require("express-async-errors");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); // to validate Object ID
const genres = require("./routes/genres");
const customer = require("./routes/customer");
const movie = require("./routes/movies");
const rental = require("./routes/rental");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const { endPoints } = require("./common/endpoints");
const config = require("config");
const error = require("./middleware/error");
const app = express();

app.use(express.json()); // to parse the Json Object From The Data-base
app.use(endPoints.genres, genres); // humne yaha bata diya hai routes to courses k ander alag alag route btany ki zarorat nahi
app.use(endPoints.customers, customer); // humne yaha bata diya hai routes to courses k ander alag alag route btany ki zarorat nahi
app.use(endPoints.movies, movie);
app.use(endPoints.rentals, rental);
app.use(endPoints.users, users);
app.use(endPoints.auth, auth);
app.use(error);

if (!config.get("jwtPrivateKey")) {
  console.error("Fatal Error: JWT Private Key is not defined!");
  process.exit(1);
}

mongoose
  .connect("mongodb://127.0.0.1/vidly")
  .then(() => {
    console.log("Sucessfully connected to db..");
  })
  .catch((e) => console.error("Can not connect to db", e));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
