import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import {
  productValidation,
  validate
} from "../middleware/validationMiddleware.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect,  productValidation, validate, createProduct)
  .get(getProducts);

router.route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;