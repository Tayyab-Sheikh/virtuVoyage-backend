const User = require("../models/User");
const Tour = require("../models/Tour"); // We’ll create this in next step
const Enrollment = require("../models/Enrollment"); // same

// Get all users (with optional ?role=guide or ?role=tourist)
exports.getAllUsers = async (req, res) => {
  try {
    const query = req.query.role ? { role: req.query.role } : {};
    const users = await User.find(query).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Approve a guide
exports.approveGuide = async (req, res) => {
  try {
    const guide = await User.findById(req.params.id);
    if (!guide || guide.role !== "guide") {
      return res.status(404).json({ message: "Guide not found" });
    }

    guide.isApproved = req.body.isApproved;
    await guide.save();

    res.json({ message: "Guide approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error approving guide" });
  }
};

// Dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalTourists = await User.countDocuments({ role: "tourist" });
    const totalGuides = await User.countDocuments({ role: "guide" });
    const pendingGuides = await User.countDocuments({
      role: "guide",
      isApproved: false,
    });

    const totalTours = await Tour.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    res.json({
      tourists: totalTourists,
      guides: totalGuides,
      pendingGuides,
      tours: totalTours,
      enrollments: totalEnrollments,
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading dashboard data" });
  }
};
