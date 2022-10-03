import express from "express";
import {
  InsertRental,
  ReadRentals,
  ReturnRental,
  DeleteRental,
} from "../controllers/rentalsControllers.js";

const router = express.Router();

router.post("/rentals", InsertRental);

router.get("/rentals", ReadRentals);

router.post("/rentals/:id/return", ReturnRental);

router.delete("/rentals/:id", DeleteRental);

export default router;
