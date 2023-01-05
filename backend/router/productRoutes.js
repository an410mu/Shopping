import express from "express";
const router = express.Router();
import {
  getProduct,
  getProductById,
  createReview,
} from "../controller/productController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProduct);

router.route("/:id").get(getProductById);

router.route("/:id/reviews").post(protect, createReview);

export default router;
