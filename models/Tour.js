const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    maxTourists: { type: Number, required: true },
    status: { type: String },
    images: [String], // just URLs for now
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    zoomJoinLink: { type: String },
    zoomHostLink: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
