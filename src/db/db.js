import pg from "pg";
import { DATABASE_URL } from "../configs/constants.js";

const { Pool } = pg;

const connection = new Pool({
  connectionString: DATABASE_URL,
});

export default connection;
