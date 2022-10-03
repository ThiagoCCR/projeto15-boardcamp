import express from "express";
import {
  CreateCustomer,
  ReadCustomer,
  GetCostumerById,
  UpdateUser,
} from "../controllers/customersControllers.js";
import { validateCustomerSchema } from "../middlewares/joiMiddlewares.js";
import { validateCpf } from "../middlewares/customersMiddlewares.js";

const router = express.Router();

router.post("/customers", validateCustomerSchema, validateCpf, CreateCustomer);

router.get("/customers", ReadCustomer);

router.get("/customers/:id", GetCostumerById);

router.put("/customers/:id", validateCustomerSchema, validateCpf, UpdateUser);

export default router;
