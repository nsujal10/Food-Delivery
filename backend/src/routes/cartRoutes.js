const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 */

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/v1/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/v1/cart/update:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/v1/cart/remove/{menuItemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */


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

// Update Cart Item Quantity
router.patch("/update", auth, async (req, res) => {
  const { menuItemId, quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  }

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const item = cart.items.find(
    item => item.menuItem.toString() === menuItemId
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  item.quantity = quantity;

  await cart.save();

  res.json({ message: "Cart updated successfully", cart });
});


// Remove Item from Cart
router.delete("/remove/:menuItemId", auth, async (req, res) => {

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    item => item.menuItem.toString() !== req.params.menuItemId
  );

  await cart.save();

  res.json({ message: "Item removed from cart", cart });
});


module.exports = router;
