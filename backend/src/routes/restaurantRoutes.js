const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

router.post("/", async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.json(restaurant);
});

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

module.exports = router;
