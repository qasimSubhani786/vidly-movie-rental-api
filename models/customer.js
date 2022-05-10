const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255,
  },
  isGold: {
    type: String,
    default: false,
  },
});
const Customer = mongoose.model("Customer", customerSchema);

// Validation Schema
const validateCourse = (customer) => {
  let schema = {
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCourse;
