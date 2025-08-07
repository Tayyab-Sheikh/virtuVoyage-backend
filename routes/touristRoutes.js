const express = require("express");
const router = express.Router();
const {
  getAvailableTours,
  enrollInTour,
  getMyEnrollments,
} = require("../controllers/touristController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.use(protect, authorizeRoles("tourist"));

router.get("/tours", getAvailableTours);
router.post("/enroll/:tourId", enrollInTour);
router.get("/my-tours", getMyEnrollments);

module.exports = router;
