const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const Joi = require("joi");
const config = require("config");
const router = express.Router();

//to create a new user object
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status("404").send(error);

  let user = await User.findOne({
    email: req.body.email,
  });

  if (!user) return res.status("404").send("Invalid User or Password! ");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status("404").send("Invalid User or Password! ");

  const token = user.generateAuthToken();
  res.send({
    success: true,
    token,
  });
});

const validate = (req) => {
  let schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
};

module.exports = router;
