const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand", // Reference to the Brand model
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Assuming you store the image URL
    required: true,
  },
  discount: {
    type: Boolean,
    default: false,
  },
  discountPrice: {
    type: String,
  },
  remark: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
