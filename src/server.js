import express from "express";
import cors from "cors";
import categoriesRouter from "./routers/categoriesRouters.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRouter);

app.listen(4000, () => {
  console.log("Server is listening on port 4000.");
});
