const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const auth = require("../middlewares/authMiddleware");

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

module.exports = router;
