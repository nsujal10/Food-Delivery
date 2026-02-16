const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);
