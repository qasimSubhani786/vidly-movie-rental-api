const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  }, //required validators
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin:Boolean
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id,isAdmin:this.isAdmin }, config.get("jwtPrivateKey")); // here we are getting value from the environmental variables to set the Env-Variables export varName = secretkey
  return token;
};

const User = mongoose.model("User", userSchema);

//Validation Schema
const validateUser = (user) => {
  let schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
