// utils/zoomApi.js

exports.generateZoomMeeting = async (tourTitle, startTime) => {
  // Simulated logic — can replace with real Zoom API later
  const id = Math.floor(100000000 + Math.random() * 900000000);
  return {
    join_url: `https://zoom.us/j/${id}`,
    host_url: `https://zoom.us/host/${id}`,
  };
};
