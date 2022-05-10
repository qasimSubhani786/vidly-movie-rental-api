const { Movie, validate } = require("../models/movie");
const express = require("express");
const { Genre } = require("../models/genre");
const router = express.Router();
const auth = require("../middleware/auth");
const asyncHandler = require("../middleware/asyncHandler");

//To Get the movie array
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const movie = await Movie.find().select("-genre._id").lean();
    res.send(movie);
  })
);

//to create a new course object
router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status("404").send(error);
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status("404").send("Course not found in DB!");

    let movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    movie = await movie.save();
    res.status(200).send(movie);
  })
);

// put --update the course
// router.put("/:id", asyncHandler(async (req, res) => {
//   let { error } = validate(req.body);
//   if (error) {
//     return res.status("404").send(error);
//   }

//   try {
//     const movie = await Movie.findByIdAndUpdate(
//       req.params.id,
//       {
//         title: req.body.title,
//         numberInStock: req.body.numberInStock,
//         dailyRentalRate: req.body.dailyRentalRate,

//       },
//       { new: true }
//     );
//     if (!movie) {
//       return res.status("404").send("Genre not found in DB!");
//     }
//     res.send(movie);
//   } catch (error) {
//     console.log("movie ==>", error);
//   }
// });

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    //lookup the course --if not exixting return 404
    if (!movie) {
      return res.status("404").send("Course not found in DB!");
    }
    //delelte the course
    res.send(movie);
  })
);

//specific course on the basis of ID
//how to read value from the URL as parameter
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status("404").send("movie not found in DB!");
    } else {
      return res.send(movie);
    }
  })
);

module.exports = router;
