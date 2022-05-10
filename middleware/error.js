module.exports = function (err, req, res, next) {
  // Log the message
  res.status(500).send("Something Failed." + err);
};
