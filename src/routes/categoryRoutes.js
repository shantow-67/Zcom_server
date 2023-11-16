const express = require("express");

const { CategoryList } = require("../controller/categoryController");

const router = express.Router();

router.get("/", CategoryList);

module.exports = router;
