const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
  amount: Number,
  paymentMethod: {
    type: String,
    enum: ["CARD", "UPI", "COD"],
    required: true
  },
  status: {
    type: String,
    enum: ["SUCCESS", "FAILED"],
    default: "SUCCESS"
  },
  transactionId: String
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
