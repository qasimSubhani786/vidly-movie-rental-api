const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect("mongodb://127.0.0.1/vidly").then(() => {
    winston.info("Sucessfully connected to db..");
  });
};
