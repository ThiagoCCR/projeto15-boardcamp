import connection from "../db/db.js";

async function validateGame(req, res, next) {
  const gameData = res.locals.game;

  try {
    const categoryIsValid = await connection.query(
      "SELECT name FROM categories WHERE name=$1;",
      [gameData.name]
    );
    if (!categoryIsValid) {
      return res.status(400).send("Categoria inexistente");
    }

    let allGames = await connection.query("SELECT * FROM games;");
    allGames = allGames.rows;
    const isUsed = allGames.find(
      (val) => val.name.toLowerCase() === gameData.name.toLowerCase()
    );
    if (isUsed) {
      return res.status(409).send("O jogo já está cadastrado");
    }
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

export { validateGame };
