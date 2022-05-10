const express = require("express");
const Fawn = require("fawn");
const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");

Fawn.init(mongoose); // fawn is like the to Perform Transaction(Two phase commits)
//To Get the movie array
router.get("/", async (req, res) => {
  const movie = await Rental.find()
    .populate("customer._id")
    .lean()
    .select(" ")
    .sort("-dateOut");
  res.send(movie);
});

//to create a new course object
router.post("/", auth,async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    console.log("Error in rentals=>", error);
    return res.status("404").send(error);
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status("404").send("Invalid Customer!");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status("404").send("Invalid Movie!");

  if (movie.numberInStock === 0) {
    return res.status(400).send("Movie not in stock!");
  }

  let rental = new Rental({
    customer: { _id: customer._id, name: customer.name, phone: customer.phone },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    new Fawn.Task() // just Like Transaction to perform multiple oerations (Database) at once
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
    res.status(200).send(rental);
  } catch (error) {
    res.status(500).send("Something Failed!");
  }
});

module.exports = router;
