const express = require("express");
const router = express.Router();
const { generateItinerary } = require("./aiService");

router.post("/generate-itinerary", async (req, res) => {
  const { destination, startDate, endDate, preferences } = req.body;

  if (!destination || !startDate || !endDate || !preferences) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const itinerary = await generateItinerary(destination, startDate, endDate, preferences);
    res.json({ itinerary });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

module.exports = router;
