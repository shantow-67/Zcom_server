const express = require("express");

const { BrandList } = require("../controller/brandController");
const router = express.Router();

router.get("/", BrandList);

module.exports = router;
