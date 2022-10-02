import express from "express";
import {
  CreateCustomer,
  ReadCustomer,
  GetCostumerById,
  UpdateUser
} from "../controllers/customersControllers.js";

const router = express.Router();

router.post("/customers", CreateCustomer);

router.get("/customers", ReadCustomer);

router.get("/customers/:id", GetCostumerById);

router.put("/customers/:id", UpdateUser);

export default router;
