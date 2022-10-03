import express from "express";
import cors from "cors";
import categoriesRouter from "./routers/categoriesRouters.js";
import gamesRouter from "./routers/gamesRouter.js";
import customerRouter from "./routers/customersRouter.js";
import rentalsRouter from "./routers/rentalsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customerRouter);
app.use(rentalsRouter);

app.listen(4000, () => {
  console.log("Server is listening on port 4000.");
});
