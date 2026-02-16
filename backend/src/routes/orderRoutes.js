const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");


const router = express.Router();

router.post("/create", auth, async (req, res) => {

  const cart = await Cart.findOne({ user: req.user.id })
    .populate("items.menuItem");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let total = 0;

  cart.items.forEach(item => {
    total += item.menuItem.price * item.quantity;
  });

  const order = await Order.create({
    user: req.user.id,
    items: cart.items,
    totalAmount: total
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  res.json(order);
});




// Get Order History
router.get("/my-orders", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate("items.menuItem")
    .sort({ createdAt: -1 });

  res.json(orders);
});


// Cancel Order
router.patch("/:orderId/cancel", auth, async (req, res) => {

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Ensure user owns this order
  if (order.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Only allow cancellation if not delivered
  if (order.status === "DELIVERED") {
    return res.status(400).json({ message: "Delivered orders cannot be cancelled" });
  }

  order.status = "CANCELLED";
  await order.save();

  res.json({ message: "Order cancelled successfully", order });
});


// Admin Update Order Status
router.patch("/:orderId/status", auth, role("admin"), async (req, res) => {

  const { status } = req.body;

  const validStatuses = ["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  await order.save();

  res.json({
    message: "Order status updated successfully",
    order
  });
});



module.exports = router;
