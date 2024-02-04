const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes/index");
const dbConnection = require("./database/mongodb");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", routes);

// Initialize database connection
dbConnection();

// Starting the server
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Server running on http://www.localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

if (process.env.NODE_ENV === "production") {
  console.log("running in production mode");
} else {
  console.log("running in development mode.");
}
