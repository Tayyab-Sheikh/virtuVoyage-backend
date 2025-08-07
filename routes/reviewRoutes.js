const express = require("express");
const router = express.Router();
const {
  addReview,
  updateReview,
  deleteReview,
  getReviewsForTour,
} = require("../controllers/reviewController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Tourist routes
router.use(protect, authorizeRoles("tourist"));

// Add review
router.post("/:tourId", addReview);

// Update review
router.put("/:tourId", updateReview);

// Delete review
router.delete("/:tourId", deleteReview);

// Public route — get reviews for a tour (no auth)
router.get("/public/:tourId", getReviewsForTour);

module.exports = router;
