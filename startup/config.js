const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("Fatal Error: JWT Private Key is not defined!");
  }
};
