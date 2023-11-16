const { allBrands } = require("../services/productServices/productServices");

exports.BrandList = async (req, res) => {
  const result = await allBrands();
  return res.status(200).json(result);
};
