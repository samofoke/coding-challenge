const mongoose = require("mongoose");

const mongoDbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Successfully connected to mongodb.");
  } catch (err) {
    console.log("could not connect to mogodb: ", err);
    process.exit(1);
  }
};

module.exports = mongoDbConnection;
