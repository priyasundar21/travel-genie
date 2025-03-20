const axios = require("axios");
require("dotenv").config();

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.API_KEY;

const generateItinerary = async (
  destination,
  startDate,
  endDate,
  preferences
) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: "You are a helpful travel assistant." },
          {
            role: "user",
            content: `Plan a ${preferences.join(
              ", "
            )}-focused trip to ${destination} from ${startDate} to ${endDate}. 
            Keep it simple and short responses are fine.
            Respond in the following format:
            [
                            {
                                "title": "Day 1",
                                "activities": []
                            },
                            {
                                "title": "Day 2",
                                "activities": []
                            },
                            {
                                "title": "Day 3",
                                "activities": []
                            },
                            {
                                "title": "Day 4",
                                "activities": [
                                    {
                                        "timeOfTheDay": "",
                                        "activity": "Visit the Louvre Museum"
                                    }
                                ]
                            }
                        ]
            and so on... 
            YOU MUST NOT ADD any punctutations, quotes or extra text. JUST THE ARRAY OF OBJECTS IS ENOUGH as shown above.
            Time of the day should be Morning, Afternoon and Evening`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't generate an itinerary.";
  }
};

module.exports = { generateItinerary };
