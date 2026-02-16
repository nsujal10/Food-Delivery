const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["ASSIGNED", "PICKED_UP", "OUT_FOR_DELIVERY", "DELIVERED"],
    default: "ASSIGNED"
  }
}, { timestamps: true });

module.exports = mongoose.model("Delivery", deliverySchema);
