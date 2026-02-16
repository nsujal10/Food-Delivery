const express = require("express");
const { register, login } = require("../controllers/authController");const auth = require("../middlewares/authMiddleware");
const User = require("../models/User");


const router = express.Router();

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
