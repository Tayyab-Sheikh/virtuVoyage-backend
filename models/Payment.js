const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amountPaid: { type: Number, required: true },
  guideEarning: { type: Number, required: true },
  platformFee: { type: Number, required: true },
  paidAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["paid", "failed"], default: "paid" },
});

module.exports = mongoose.model("Payment", paymentSchema);
