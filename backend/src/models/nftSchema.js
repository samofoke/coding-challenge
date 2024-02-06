const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  nftAddress: String,
  price: Number,
  isForSale: { type: Boolean, default: false },
  currentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = nftSchema;
