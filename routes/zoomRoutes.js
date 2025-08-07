const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { createZoomLinkForTour } = require("../controllers/zoomController");

router.post(
  "/:tourId",
  protect,
  authorizeRoles("guide"),
  createZoomLinkForTour
);

module.exports = router;
