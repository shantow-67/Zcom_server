const CategoryModel = require("../../models/CategoryModel");
const BrandModel = require("../../models/BrandModel");
const Product = require("../../models/ProductModel");
const FlashSale = require("../../models/FlashSaleModel");
const ProductSliderModel = require("../../models/");
const mongoose = require("mongoose");

const AllProduct = async () => {
  try {
    const product = await Product.find({});
    return { status: "success", data: product };
  } catch (error) {
    return { status: "fail", data: "Something went wrong" };
  }
};

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

const ProductBYRemark = async (req) => {
  try {
    let remark = req.params.remark;
    let JoinStage1 = {
      $lookup: {
        from: "Category",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "Brand",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { remark: remark } };
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await Product.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const ProductBYCategory = async (req) => {
  try {
    console.log(req.params.id);
    let categoryID = new mongoose.Types.ObjectId(req.params.id);
    console.log(categoryID);
    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "Brand",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { categoryID: categoryID } };
    console.log(matchStage);
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await Product.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const ProductBYBrand = async (req) => {
  try {
    let brandID = new mongoose.Types.ObjectId(req.params.id);
    let JoinStage1 = {
      $lookup: {
        from: "Category",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "Brand",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { brandID: brandID } };
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await Product.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};
const ProductBYCategoryLimit10 = async (req) => {
  try {
    let categoryID = new ObjectId(req.params.categoryID);
    let JoinStage1 = {
      $lookup: {
        from: "Category",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "Brand",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { categoryID: categoryID } };
    let limit = { $limit: 10 };
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await Product.aggregate([
      matchStage,
      limit,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};
const ProductBYSlider = async (req) => {
  try {
    let matchStage = { $match: {} };
    let limit = { $limit: 5 };
    let data = await ProductSliderModel.aggregate([matchStage, limit]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const ProductBYKeyword = async (req) => {
  try {
    let SearchRegex = { $regex: req.params.keyword, $options: "i" };
    let SearchParam = [{ title: SearchRegex }, { shortDes: SearchRegex }];
    let SearchQuery = { $or: SearchParam };
    let matchStage = { $match: SearchQuery };
    let JoinStage1 = {
      $lookup: {
        from: "Category",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "Brand",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await Product.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const FlashSaleServices = async (req) => {
  try {
    const { productId, discountPercentage } = req.body;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return { error: "Product not found" };
    }

    // Check if the flash product exists

    const existingflash = await FlashSale.findOne({
      productId: existingProduct._id,
    });

    if (existingflash) {
      return { error: "Product is already flash sale" };
    }

    // Create a new flash sale directly
    const insertedFlashSale = await FlashSale.create({
      productId: existingProduct._id,
      discountPercentage,
    });

    return { status: "success", data: insertedFlashSale };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const AllFlashSale = async (req) => {
  try {
    const flashProduct = await FlashSale.find({});
    return { status: "success", data: flashProduct };
  } catch (error) {
    return { status: "fail", data: e.toString() };
  }
};

module.exports = {
  AllProduct,
  allCategories,
  allBrands,
  ProductBYRemark,
  ProductBYCategory,
  ProductBYBrand,
  ProductBYCategoryLimit10,
  ProductBYSlider,
  ProductBYKeyword,
  FlashSaleServices,
  AllFlashSale,
};
