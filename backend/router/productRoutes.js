import express from "express";
const router = express.Router();
import Product from "../models/productSchema.js";

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);
    res.send(singleProduct);
  } catch (error) {
    console.log(error);
  }
});

export default router;
