const express = require("express");
const { register, login } = require("../controllers/authController");const auth = require("../middlewares/authMiddleware");
const User = require("../models/User");


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user and receive JWT
 *     tags: [Auth]
 */

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 */


router.post("/register", register);
router.post("/login", login);

// Get current logged-in user
router.get("/me", auth, async (req, res) => {

  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    success: true,
    data: user
  });
});


// Logout (simple version)
router.post("/logout", auth, async (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully"
  });
});


module.exports = router;
