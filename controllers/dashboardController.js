const Tour = require("../models/Tour");
const Enrollment = require("../models/Enrollment");

// Guide Dashboard
exports.getGuideDashboard = async (req, res) => {
  try {
    const tours = await Tour.find({ guide: req.user.id });

    let totalEnrollments = 0;
    for (let tour of tours) {
      const count = await Enrollment.countDocuments({ tour: tour._id });
      totalEnrollments += count;
    }

    const upcoming = tours.filter((t) => new Date(t.startDate) > new Date());
    const past = tours.filter((t) => new Date(t.endDate) < new Date());

    res.json({
      totalTours: tours.length,
      totalTourists: totalEnrollments,
      upcomingTours: upcoming,
      pastTours: past,
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading guide dashboard" });
  }
};

// Tourist Dashboard
exports.getTouristDashboard = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      tourist: req.user.id,
    }).populate("tour");

    const now = new Date();
    const upcoming = enrollments.filter(
      (e) => new Date(e.tour.startDate) > now
    );
    const past = enrollments.filter((e) => new Date(e.tour.endDate) < now);

    res.json({
      totalTours: enrollments.length,
      upcomingTours: upcoming.map((e) => e.tour),
      pastTours: past.map((e) => e.tour),
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading tourist dashboard" });
  }
};
