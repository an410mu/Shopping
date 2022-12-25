import express from "express";
const router = express.Router();
import { getProduct, getProductById } from "../controller/productController.js";

router.get("/", getProduct);

router.get("/:id", getProductById);

export default router;
