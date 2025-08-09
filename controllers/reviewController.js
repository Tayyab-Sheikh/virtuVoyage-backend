const Review = require("../models/Review");
const Tour = require("../models/Tour");
const Enrollment = require("../models/Enrollment");

// Add review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const tour = await Tour.findById(req.params.tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // Check if tour is complete & tourist was enrolled
    const now = new Date();
    if (tour.status !== "completed")
      return res.status(400).json({ message: "Tour not completed yet" });

    const isEnrolled = await Enrollment.findOne({
      tour: tour._id,
      tourist: req.user.id,
    });
    if (!isEnrolled)
      return res.status(403).json({ message: "Not enrolled in this tour" });

    const review = new Review({
      tour: tour._id,
      tourist: req.user.id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "You already reviewed this tour" });
    }
    res.status(500).json({ message: "Error adding review" });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      tour: req.params.tourId,
      tourist: req.user.id,
    });
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    res.json({ message: "Review updated", review });
  } catch (err) {
    res.status(500).json({ message: "Error updating review" });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      tour: req.params.tourId,
      tourist: req.user.id,
    });
    if (!review) return res.status(404).json({ message: "Review not found" });

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review" });
  }
};

// Get reviews for a tour (public)
exports.getReviewsForTour = async (req, res) => {
  try {
    const reviews = await Review.find({ tour: req.params.tourId }).populate(
      "tourist",
      "name"
    );
    const avgRating =
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(1)
        : 0;

    res.json({
      averageRating: avgRating,
      totalReviews: reviews.length,
      reviews,
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading reviews" });
  }
};

exports.getTourReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("tourist tour");
    res.json({
      totalReviews: reviews.length || 0,
      reviews: reviews || [],
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading reviews" });
  }
};
