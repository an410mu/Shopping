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

//product modification:create product, delete product, update product in admin

//create review
const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, ele) => ele.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const getTopProduct = async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
};

export { getProduct, getProductById, createReview, getTopProduct };
