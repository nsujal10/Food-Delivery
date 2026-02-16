const express = require("express");
const Delivery = require("../models/Delivery");
const Order = require("../models/Order");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Delivery
 */

/**
 * @swagger
 * /api/v1/delivery/assign/{orderId}:
 *   post:
 *     summary: Assign delivery partner
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/v1/delivery/{deliveryId}/status:
 *   patch:
 *     summary: Update delivery status
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 */


router.post("/assign/:orderId", auth, role("delivery"), async (req, res) => {

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status !== "CONFIRMED") {
    return res.status(400).json({ message: "Order not ready for delivery" });
  }

  const existingDelivery = await Delivery.findOne({ order: order._id });

  if (existingDelivery) {
    return res.status(400).json({ message: "Delivery already assigned" });
  }

  const delivery = await Delivery.create({
    order: order._id,
    deliveryPartner: req.user.id
  });

  res.json({
    message: "Order assigned to delivery partner",
    delivery
  });
});


router.post("/assign/:orderId", auth, role("delivery"), async (req, res) => {

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status !== "CONFIRMED") {
    return res.status(400).json({ message: "Order not ready for delivery" });
  }

  const existingDelivery = await Delivery.findOne({ order: order._id });

  if (existingDelivery) {
    return res.status(400).json({ message: "Delivery already assigned" });
  }

  const delivery = await Delivery.create({
    order: order._id,
    deliveryPartner: req.user.id
  });

  res.json({
    message: "Order assigned to delivery partner",
    delivery
  });
});

module.exports = router;
