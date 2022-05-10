const Joi = require("joi");
const mongoose = require("mongoose");
const { genreScheme } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreScheme,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

//Validation Schema
const validateMovie = (movie) => {
  let schema = {
    title: Joi.string().min(3).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  };
  return Joi.validate(movie, schema);
};

exports.Movie = Movie;
exports.validate = validateMovie;
