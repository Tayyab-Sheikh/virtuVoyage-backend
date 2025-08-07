const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
  },
  { timestamps: true }
);

// Prevent multiple reviews from the same tourist on one tour
reviewSchema.index({ tour: 1, tourist: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
