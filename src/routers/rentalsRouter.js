import express from "express";
import {
  InsertRental,
  ReadRentals,
  ReturnRental,
  DeleteRental,
} from "../controllers/rentalsControllers.js";

import { validateRentalSchema } from "../middlewares/joiMiddlewares.js";

import {
  validateRental,
  validateReturnRental,
  validateDeleteRental,
} from "../middlewares/rentalsMiddlewares.js";

const router = express.Router();

router.post("/rentals", validateRentalSchema, validateRental, InsertRental);

router.get("/rentals", ReadRentals);

router.post("/rentals/:id/return", validateReturnRental, ReturnRental);

router.delete("/rentals/:id", validateDeleteRental, DeleteRental);

export default router;
