const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// Add to Cart
router.post("/add", auth, async (req, res) => {
  const { menuItemId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [{ menuItem: menuItemId, quantity }]
    });
  } else {
    cart.items.push({ menuItem: menuItemId, quantity });
    await cart.save();
  }

  res.json(cart);
});

// Get Cart
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate("items.menuItem");

  res.json(cart);
});

module.exports = router;
