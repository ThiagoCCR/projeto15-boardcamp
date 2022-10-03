import express from "express";
import {
  InsertRental,
  ReadRentals,
  ReturnRental,
} from "../controllers/rentalsControllers.js";

const router = express.Router();

router.post("/rentals", InsertRental);

router.get("/rentals", ReadRentals);

router.post("/rentals/:id/return", ReturnRental);

//router.put("/customers/:id", UpdateUser);

export default router;
