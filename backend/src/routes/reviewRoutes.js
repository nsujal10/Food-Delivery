const express = require("express");
const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Add review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/v1/reviews/{restaurantId}:
 *   get:
 *     summary: Get restaurant reviews
 *     tags: [Reviews]
 */


/**
 * @swagger
 * /api/v1/reviews/{reviewId}:
 *   delete:
 *     summary: Delete review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 */

router.post("/", auth, async (req, res) => {

  const { restaurantId, rating, comment } = req.body;

  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  // Prevent duplicate review
  const existingReview = await Review.findOne({
    user: req.user.id,
    restaurant: restaurantId
  });

  if (existingReview) {
    return res.status(400).json({ message: "You already reviewed this restaurant" });
  }

  const review = await Review.create({
    user: req.user.id,
    restaurant: restaurantId,
    rating,
    comment
  });

  // Recalculate average rating
  const reviews = await Review.find({ restaurant: restaurantId });

  const avgRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

  restaurant.rating = avgRating.toFixed(1);
  await restaurant.save();

  res.status(201).json({
    message: "Review added successfully",
    review
  });
});

router.get("/:restaurantId", async (req, res) => {

  const reviews = await Review.find({
    restaurant: req.params.restaurantId
  }).populate("user", "name");

  res.json(reviews);
});


router.delete("/:reviewId", auth, async (req, res) => {

  const review = await Review.findById(req.params.reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  // Allow user who created OR admin
  if (
    review.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await review.deleteOne();

  res.json({ message: "Review deleted successfully" });
});




module.exports = router;

