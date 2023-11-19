const CategoryModel = require("../../models/CategoryModel");
const BrandModel = require("../../models/BrandModel");
const Product = require("../../models/ProductModel");

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


const ProductBYRemark= async (req)=>{
  try{
      let remark=req.params.remark
      let JoinStage1={$lookup: {from: "Category", localField: "categoryID", foreignField: "_id", as: "category"}};
      let JoinStage2={$lookup: {from: "Brand", localField: "brandID", foreignField: "_id", as: "brand"}};
      let matchStage= {$match: {remark:remark}}
      let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
      let unwindCategoryStage={$unwind: "$category"}
      let unwindBrandStage={$unwind: "$brand"}
      let data=await Product.aggregate(
          [matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage]
      )
      return {status:"success", data:data}
  }
  catch (e) {
      return {status:"fail", data:e.toString()}
  }
}

const ProductBYCategory= async (req)=>{
  try{
      let categoryID=new ObjectId(req.params.categoryID)
      let JoinStage1={$lookup: {from: "Category", localField: "categoryID", foreignField: "_id", as: "category"}};
      let JoinStage2={$lookup: {from: "Brand", localField: "brandID", foreignField: "_id", as: "brand"}};
      let matchStage= {$match: {categoryID:categoryID}}
      let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
      let unwindCategoryStage={$unwind: "$category"}
      let unwindBrandStage={$unwind: "$brand"}
      let data=await Product.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])
      return {status:"success", data:data}
  }
  catch (e) {
      return {status:"fail", data:e.toString()}
  }
}

const ProductBYBrand= async (req)=>{
  try{
      let brandID=new ObjectId(req.params.brandID)
      let JoinStage1={$lookup: {from: "Category", localField: "categoryID", foreignField: "_id", as: "category"}};
      let JoinStage2={$lookup: {from: "Brand", localField: "brandID", foreignField: "_id", as: "brand"}};
      let matchStage= {$match: {brandID:brandID}}
      let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
      let unwindCategoryStage={$unwind: "$category"}
      let unwindBrandStage={$unwind: "$brand"}
      let data=await Product.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])
      return {status:"success", data:data}
  }
  catch (e) {
      return {status:"fail", data:e.toString()}
  }
}
const ProductBYCategoryLimit10= async (req)=>{
  try{
      let categoryID=new ObjectId(req.params.categoryID)
      let JoinStage1={$lookup: {from: "Category", localField: "categoryID", foreignField: "_id", as: "category"}};
      let JoinStage2={$lookup: {from: "Brand", localField: "brandID", foreignField: "_id", as: "brand"}};
      let matchStage= {$match: {categoryID:categoryID}}
      let limit= {$limit:10}
      let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
      let unwindCategoryStage={$unwind: "$category"}
      let unwindBrandStage={$unwind: "$brand"}
      let data=await Product.aggregate([matchStage,limit, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])
      return {status:"success", data:data}
  }
  catch (e) {
      return {status:"fail", data:e.toString()}
  }
}
const ProductBYSlider= async (req)=>{
  try{
      let matchStage= {$match: {}}
      let limit= {$limit:5}
      let data=await ProductSliderModel.aggregate([matchStage,limit])
      return {status:"success", data:data}
  }
  catch (e) {
      return {status:"fail", data:e.toString()}
  }
}

const ProductBYKeyword= async (req)=>{
  try{
      let SearchRegex = {"$regex": req.params.keyword, "$options": "i"}
      let SearchParam = [{title: SearchRegex},{shortDes: SearchRegex}]
      let SearchQuery = {$or:SearchParam}
      let matchStage=  {$match: SearchQuery};
      let JoinStage1={$lookup: {from: "Category", localField: "categoryID", foreignField: "_id", as: "category"}};
      let JoinStage2={$lookup: {from: "Brand", localField: "brandID", foreignField: "_id", as: "brand"}};
      let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
      let unwindCategoryStage={$unwind: "$category"}
      let unwindBrandStage={$unwind: "$brand"}
      let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage])
      return {status:"success", data:data}
  }
  catch (e) {
      return {status:"fail", data:e.toString()}
  }
}


module.exports = { allCategories, allBrands, ProductBYRemark, ProductBYCategory, ProductBYBrand, ProductBYCategoryLimit10, ProductBYSlider, ProductBYKeyword};
