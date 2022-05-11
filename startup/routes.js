const { endPoints } = require("../common/endpoints");
const genres = require("../routes/genres");
const customer = require("../routes/customer");
const movie = require("../routes/movies");
const rental = require("../routes/rental");
const users = require("../routes/users");
const auth = require("../routes/auth");
const express = require("express");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json()); // to parse the Json Object From The Data-base
  app.use(endPoints.genres, genres); // humne yaha bata diya hai routes to courses k ander alag alag route btany ki zarorat nahi
  app.use(endPoints.customers, customer); // humne yaha bata diya hai routes to courses k ander alag alag route btany ki zarorat nahi
  app.use(endPoints.movies, movie);
  app.use(endPoints.rentals, rental);
  app.use(endPoints.users, users);
  app.use(endPoints.auth, auth);
  app.use(error);
};
