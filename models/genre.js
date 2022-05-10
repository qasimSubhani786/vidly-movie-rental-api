const Joi = require("joi");
const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  }, //required validators
});

const Genre = mongoose.model("Genre", genresSchema);

//Validation Schema
const validate = (genre) => {
  let schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
};

exports.Genre = Genre;
exports.genreScheme = genresSchema;
exports.validate = validate;
