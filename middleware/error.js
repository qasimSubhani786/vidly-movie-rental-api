const winston = require("winston"); // used to log error messages

module.exports = function (err, req, res, next) {
  // Log the message
  winston.error(err.message, err);
  res.status(500).send("Something Failed." + err);
};
