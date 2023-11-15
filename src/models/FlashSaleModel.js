const mongoose = require("mongoose");

const flashSaleSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const FlashSale = mongoose.model("FlashSale", flashSaleSchema);

module.exports = FlashSale;
