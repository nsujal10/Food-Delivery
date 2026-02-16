const express = require("express");
const Delivery = require("../models/Delivery");
const Order = require("../models/Order");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const router = express.Router();

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
