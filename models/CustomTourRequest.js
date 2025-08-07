const mongoose = require("mongoose");

const customTourRequestSchema = new mongoose.Schema(
  {
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    duration: { type: Number, required: true }, // in hours
    maxTourists: { type: Number, required: true },
    budget: { type: Number, required: true },
    location: { type: String, required: true },
    specialRequirements: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedAt: { type: Date },
    price: { type: Number }, // set by guide when accepting
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    }, // reference to created tour when accepted
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomTourRequest", customTourRequestSchema);
