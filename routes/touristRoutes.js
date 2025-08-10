const express = require("express");
const router = express.Router();
const {
  getAvailableTours,
  enrollInTour,
  getMyEnrollments,
  getMyPayments,
} = require("../controllers/touristController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/tours", getAvailableTours);
router.use(protect, authorizeRoles("tourist"));

router.post("/enroll/:tourId", enrollInTour);
router.get("/my-tours", getMyEnrollments);
router.get("/my-payments", getMyPayments);

module.exports = router;
