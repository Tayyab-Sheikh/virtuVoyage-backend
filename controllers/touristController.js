const Tour = require("../models/Tour");
const Enrollment = require("../models/Enrollment");
const Payment = require("../models/Payment");
const { createZoomMeeting } = require("../utils/zoomApi");
const Notification = require("../models/notification");

// Get available tours (not started yet)
exports.getAvailableTours = async (req, res) => {
  try {
    const now = new Date();
    const tours = await Tour.find({ startDate: { $gt: now } }).populate(
      "guide",
      "name"
    );
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tours" });
  }
};

// Enroll in a tour
exports.enrollInTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const now = new Date();
    if (now >= tour.startDate) {
      return res
        .status(400)
        .json({ message: "Cannot enroll after tour has started" });
    }

    const currentEnrollments = await Enrollment.countDocuments({
      tour: tour._id,
    });
    if (currentEnrollments >= tour.maxTourists) {
      return res.status(400).json({ message: "Tour is full" });
    }

    const platformFee = tour.price * 0.15;
    const guideEarning = tour.price - platformFee;

    const payment = new Payment({
      tour: tour._id,
      tourist: req.user.id,
      guide: tour.guide,
      amountPaid: tour.price,
      guideEarning,
      platformFee,
    });

    await payment.save();

    const enrollment = new Enrollment({
      tour: tour._id,
      tourist: req.user.id,
    });

    await enrollment.save();

    const urls = await createZoomMeeting();
    console.log({ urls });

    await Tour.findByIdAndUpdate(tour._id, {
      zoomJoinLink: urls?.join_url,
      zoomHostLink: urls?.start_url,
    });

    const guide_notification = new Notification({
      guideId: guide._id,
      message: urls?.join_url,
    });
    const tourist_notification = new Notification({
      touristId: req.user.id,
      message: urls?.join_url,
    });
    await guide_notification.save();
    await tourist_notification.save();
    res.status(201).json({ message: "Successfully enrolled in tour" });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already enrolled in this tour" });
    }
    res.status(500).json({ message: "Error enrolling in tour" });
  }
};

// View enrolled tours
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      tourist: req.user.id,
    }).populate("tour");
    res.json(enrollments.map((en) => en.tour));
  } catch (err) {
    res.status(500).json({ message: "Error fetching enrolled tours" });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      tourist: req.user.id,
    }).populate("tour guide tourist");
    res.status(200).json({ message: "Payments Fetch!", payments });
  } catch (err) {
    res.status(500).json({ message: "Error fetching enrolled tours" });
  }
};
