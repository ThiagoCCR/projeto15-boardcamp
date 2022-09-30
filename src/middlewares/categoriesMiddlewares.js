import connection from "../db/db.js";

async function validateCategories(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Insira uma categoria...");
  }

  try {
    let allCategories = await connection.query("SELECT * FROM categories;");
    allCategories = allCategories.rows;
    const isUsed = allCategories.find(
      (val) => val.name.toLowerCase() === name.toLowerCase()
    );
    if (isUsed) {
      return res.status(409).send("A categoria já existe");
    }
    res.locals.name = name;
    next();
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

export { validateCategories };
