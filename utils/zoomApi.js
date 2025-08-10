const axios = require("axios");
const qs = require("qs");

exports.createZoomMeeting = async () => {
  try {
    // Step 1: Get Access Token
    const tokenData = qs.stringify({
      account_id: "qjyAoLZESMyF1zMOymCfHA",
      grant_type: "account_credentials",
    });

    const tokenResponse = await axios.post(
      "https://zoom.us/oauth/token",
      tokenData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic eVBGbW9vMU1USzZlTGtyRTBlbmFFZzo2RDdRU3oyY0M1VXNwU3ZpSkhjWTRld0JIMld3cXZBSQ==",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Create Meeting
    const meetingData = {
      topic: "API Meeting",
      type: 2, // Scheduled meeting
      start_time: "2025-08-09T12:00:00Z",
      duration: 30,
      timezone: "Asia/Karachi",
    };

    const meetingResponse = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      meetingData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { start_url, join_url } = meetingResponse.data;

    return { start_url, join_url };
  } catch (error) {
    console.error(
      "Error creating Zoom meeting:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create Zoom meeting");
  }
};
