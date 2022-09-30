import express from "express";
import { CreateGame, ReadGames } from "../controllers/gamesControllers.js";
import { validateGameSchema } from "../middlewares/joiMiddlewares.js";
import { validateGame } from "../middlewares/gamesMiddlewares.js";

const router = express.Router();

router.post("/games", validateGameSchema, validateGame, CreateGame);

router.get("/games", ReadGames);

export default router;
