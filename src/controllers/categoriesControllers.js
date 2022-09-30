import connection from "../db/db.js";

async function CreateCategory(req, res) {
  const name = res.locals.name;

  try {
    await connection.query("INSERT INTO categories (name) VALUES ($1)", [name]);
    res.sendStatus(201);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function GetCategories(req, res) {
  try {
    let allCategories = await connection.query("SELECT * FROM categories;");
    allCategories = allCategories.rows;
    res.status(200).send(allCategories);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

export { CreateCategory, GetCategories };
