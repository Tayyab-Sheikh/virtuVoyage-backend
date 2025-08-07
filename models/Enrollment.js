const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  joinedAt: { type: Date, default: Date.now },
});

enrollmentSchema.index({ tour: 1, tourist: 1 }, { unique: true }); // prevent duplicate enrollment

module.exports = mongoose.model("Enrollment", enrollmentSchema);
