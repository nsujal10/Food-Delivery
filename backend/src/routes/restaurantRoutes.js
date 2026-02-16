const express = require("express");
const Restaurant = require("../models/Restaurant");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 */

/**
 * @swagger
 * /api/v1/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 */


/**
 * @swagger
 * /api/v1/restaurants:
 *   post:
 *     summary: Create restaurant (Admin only)
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 */


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
