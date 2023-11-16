const express = require("express");

const AuthVerification = require("../middleware/AuthVerification");
const {
  ProductDetails,
  SlideList,
  ListByCategory,
  ListByBrand,
  ListBySimiler,
  ListByKeyword,
  ListReview,
  ListByRemark,
  WishList,
  CreateWishList,
  RemoveWishList,
  CartList,
  CreateCartList,
  RemoveCartList,
} = require("../controller/productController");

const router = express.Router();

router.get("/SlideList", SlideList);
router.get("/ProductDetails", ProductDetails);
router.get("/ListByCategory", ListByCategory);
router.get("/ListByBrand", ListByBrand);
router.get("/ListBySimiler", ListBySimiler);
router.get("/ListByKeyword", ListByKeyword);
router.get("/ListReview", ListReview);
router.get("/ListByRemark", ListByRemark);
router.get("/WishList", WishList);
router.get("/CreateWishList", CreateWishList);
router.get("/RemoveWishList", RemoveWishList);
router.get("/CartList", CartList);
router.get("/CreateCartList", CreateCartList);
router.get("/RemoveCartList", RemoveCartList);

module.exports = router;
