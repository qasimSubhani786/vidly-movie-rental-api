const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");
  res.status(200).send(user);
});

//to create a new user object
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status("404").send(error);

  let user = await User.findOne({
    email: req.body.email,
  });

  if (user) return res.status("404").send("User Already registered!");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .status(200)
    .send(_.pick(user, ["name", "email", "_id"]));
});

module.exports = router;
