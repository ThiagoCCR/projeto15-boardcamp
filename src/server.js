import express from "express";
import cors from "cors";
import connection from "./db/db.js";

const app = express();
app.use(express.json());
app.use(cors());



app.listen(4000, () => {
    console.log('Server is listening on port 4000.');
  });