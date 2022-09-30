import {
  CreateCategory,
  GetCategories,
} from "../controllers/categoriesControllers.js";
import express from "express";
import { validateCategories } from "../middlewares/categoriesMiddlewares.js";

const router = express.Router();

router.post("/categories", validateCategories, CreateCategory);

router.get("/categories", GetCategories);

export default router;
