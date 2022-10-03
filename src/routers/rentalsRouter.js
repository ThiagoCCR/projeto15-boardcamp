import express from "express";
import {
    InsertRental,
    ReadRentals
} from "../controllers/rentalsControllers.js";

const router = express.Router();

router.post("/rentals", InsertRental);

router.get("/rentals", ReadRentals);

//router.get("/customers/:id", GetCostumerById);

//router.put("/customers/:id", UpdateUser);

export default router;
