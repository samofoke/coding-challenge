const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.send("The NFT marketplace back end...");
});

// Starting the server
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Server running on http://www.localhost:${PORT}`);
});
