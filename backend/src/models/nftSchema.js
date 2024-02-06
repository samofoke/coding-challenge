const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  nftadress: String,
});

module.exports = nftSchema;
