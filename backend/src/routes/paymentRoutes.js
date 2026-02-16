const express = require("express");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 */

/**
 * @swagger
 * /api/v1/payments/pay/{orderId}:
 *   post:
 *     summary: Process payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/payments/my-payments:
 *   get:
 *     summary: Get payment history
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */


// Simulate Payment
router.post("/pay/:orderId", auth, async (req, res) => {

  const { paymentMethod } = req.body;

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (order.status !== "PENDING") {
    return res.status(400).json({ message: "Order already processed" });
  }

  // Simulate payment success
  const payment = await Payment.create({
    user: req.user.id,
    order: order._id,
    amount: order.totalAmount,
    paymentMethod,
    status: "SUCCESS",
    transactionId: "TXN" + Date.now()
  });

  // Update order status
  order.status = "CONFIRMED";
  await order.save();

  res.json({
    message: "Payment successful",
    payment,
    order
  });
});


// Get Logged-in User Payments
router.get("/my-payments", auth, async (req, res) => {

  const payments = await Payment.find({ user: req.user.id })
    .populate("order")
    .sort({ createdAt: -1 });

  res.json(payments);
});


module.exports = router;
