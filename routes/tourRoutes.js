const express = require("express");
const router = express.Router();
const {
  createTour,
  getMyTours,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");
const { getGuidePayments } = require("../controllers/paymentController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Guide only routes
router.use(protect, authorizeRoles("guide"));

router.post("/", createTour);
router.get("/my-tours", getMyTours);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

// Guide payment/earnings
router.get("/payments", getGuidePayments);

module.exports = router;
