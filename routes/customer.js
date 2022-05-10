const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//To Get the customer array
router.get("/", async (req, res) => {
  const customer = await Customer.find().lean();
  res.send(customer);
});

//to create a new course object
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status("404").send(error);
  }
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.status(200).send(customer);
});

// put --update the course
router.put("/:id", auth, async (req, res) => {
  let { error } = validate(req.body);
  if (error) {
    return res.status("404").send(error);
  }
  //lookup the course --if not exixting return 404
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
      { new: true }
    );
    if (!customer) {
      return res.status("404").send("Genre not found in DB!");
    }
    res.send(customer);
  } catch (error) {
    console.log("customer ==>", error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  //lookup the course --if not exixting return 404
  if (!customer) {
    return res.status("404").send("Course not found in DB!");
  }
  //delelte the course
  res.send(customer);
});

//specific course on the basis of ID
//how to read value from the URL as parameter
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status("404").send("customer not found in DB!");
  } else {
    return res.send(customer);
  }
});

module.exports = router;
