const CategoryModel = require("../../models/CategoryModel");
const BrandModel = require("../../models/BrandModel");

const allCategories = async () => {
  try {
    const data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: "Something went wrong" };
  }
};

const allBrands = async () => {
  try {
    const data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: "Something went wrong" };
  }
};

module.exports = { allCategories, allBrands };
