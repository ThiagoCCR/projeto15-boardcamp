import connection from "../db/db.js";

async function CreateGame(req, res) {
  const gameData = res.locals.game;

  try {
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [
        gameData.name,
        gameData.image,
        gameData.stockTotal,
        gameData.categoryId,
        gameData.pricePerDay,
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function ReadGames(req, res) {
  try {
    let allGames = await connection.query("SELECT * FROM games;");
    allGames = allGames.rows;
    res.status(200).send(allGames);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

export { CreateGame, ReadGames };
