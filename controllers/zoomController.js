const Tour = require("../models/Tour");
const { generateZoomMeeting } = require("../utils/zoomApi");

exports.createZoomLinkForTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourId);

    if (!tour || tour.guide.toString() !== req.user.id) {
      return res.status(404).json({ message: "Tour not found or not yours" });
    }

    if (tour.zoomJoinLink && tour.zoomHostLink) {
      return res
        .status(400)
        .json({ message: "Zoom meeting already created for this tour" });
    }

    const zoomData = await generateZoomMeeting(tour.title, tour.startDate);

    tour.zoomJoinLink = zoomData.join_url;
    tour.zoomHostLink = zoomData.host_url;
    await tour.save();

    res.json({
      message: "Zoom meeting created",
      zoomJoinLink: zoomData.join_url,
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating Zoom meeting" });
  }
};
