const {
  allCategories,
} = require("../services/productServices/productServices");

exports.CategoryList = async (req, res) => {
  const result = await allCategories();
  return res.status(200).json(result);
};
