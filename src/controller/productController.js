exports.SlideList = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", message: "Slider List" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.ProductDetails = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "ProductDetails" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.ListByCategory = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "ListByCategory" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.ListByBrand = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", message: "ListByBrand" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.ListBySimiler = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "ListBySimiler" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.ListByKeyword = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "ListByKeyword" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.ListReview = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", message: "ListReview" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.ListByRemark = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", message: "ListByRemark" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.WishList = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", message: "WishList" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.CreateWishList = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "CreateWishList" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.RemoveWishList = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "RemoveWishList" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.CartList = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", message: "CartList" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.CreateCartList = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "CreateCartList" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};

exports.RemoveCartList = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "RemoveCartList" });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error });
  }
};
