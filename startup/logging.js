require("express-async-errors");
const winston = require("winston"); // used to log error messages
require("winston-mongodb");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({
      filename: "logfile.log",
    })
  );
  winston.add(winston.transports.MongoDB, {
    //writing exceptions to DB
    db: "mongodb://127.0.0.1/vidly",
    level: "error",
  });
  // handling uncaught Promise Rejections
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
