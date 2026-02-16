const express = require("express");
const Restaurant = require("../models/Restaurant");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const router = express.Router();

// Admin only create restaurant
router.post("/", auth, role("admin"), async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.json(restaurant);
});

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

module.exports = router;
