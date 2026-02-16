const express = require("express");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

// Create Menu Item
router.post("/", async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.json(item);
});

// Get menu by restaurant
router.get("/:restaurantId", async (req, res) => {
  const items = await MenuItem.find({
    restaurant: req.params.restaurantId
  });
  res.json(items);
});

module.exports = router;
