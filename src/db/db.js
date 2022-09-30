import pg from "pg";
import { DATABASE_URL } from "../configs/constants.js";

console.log(DATABASE_URL)

const { Pool } = pg;

const connection = new Pool({
  connectionString: DATABASE_URL,
});

export default connection;
