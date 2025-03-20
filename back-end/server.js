require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", require("./itinerary"));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
