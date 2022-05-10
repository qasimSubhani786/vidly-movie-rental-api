const express = require("express");
const router = express.Router();

//basic output
router.get("/", (req, res) => {
  res.send("Hellow World");
});

module.exports = router;
