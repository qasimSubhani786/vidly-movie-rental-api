const { Genre, validate } = require("../models/genre");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//To Get the genres array
router.get("/", async (req, res, next) => {
  const genres = await Genre.find().lean();
  res.send(genres);
});

//to create a new genre object
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status("404").send(error);
  }
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  const user = await User.findById(req.user._id).select("-password -__v");

  res.status(200).send({ genre, user });
});

// put --update the course
router.put("/:id", auth, async (req, res) => {
  let { error } = validate(req.body);
  if (error) {
    return res.status("404").send(error);
  }
  //lookup the course --if not exixting return 404
  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (!genre) {
      return res.status("404").send("Genre not found in DB!");
    }
    res.send(genre);
  } catch (error) {
    console.log("genre ==>", error);
  }
});

//Role Base Authorization
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  //lookup the course --if not exixting return 404
  if (!genre) {
    return res.status("404").send("Course not found in DB!");
  }
  //delelte the course
  res.send(genre);
});

//specific course on the basis of ID
//how to read value from the URL as parameter
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status("404").send("genre not found in DB!");
  } else {
    return res.send(genre);
  }
});

module.exports = router;
