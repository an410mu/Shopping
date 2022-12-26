import Product from "../models/productSchema.js";

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);
    if (singleProduct) {
      res.json(singleProduct);
    } else {
      res.status(404);
      throw Error("Product not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export { getProduct, getProductById };
