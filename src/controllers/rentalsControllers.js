import connection from "../db/db.js";
import joi from "joi";

const rentalSchema = joi.object({
  customerId: joi.number().required(),
  customerId: joi.number().required(),
  daysRented: joi.number().required(),
});

async function InsertRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const returnDate = null;
  const delayFee = null;
  const date = dayjs().locale("pt-br").format("YYYY-MM-DD");

  const validation = rentalSchema.validate(
    { customerId, gameId, daysRented },
    { abortEarly: false }
  );

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(422).send(error);
  }
  if (daysRented < 1) {
    return res.status(400).send("Os dias alugados tem que ser maior que um");
  }

  try {
    const customer = await connection.query(
      `SELECT * FROM customers WHERE id=$1`,
      [customerId]
    );
    if (customer.rows.length === 0) {
      return res.status(400).send("Cliente não encontrado");
    }
    const game = await connection.query(`SELECT * FROM games WHERE id=$1`, [
      gameId,
    ]);
    if (game.rows.length === 0) {
      return res.status(400).send("Jogo não encontrado");
    }
    const validGame = game.find(
      (value) => value.id === gameId && value.stockTotal > 0
    );
    const originalPrice = daysRented * validGame.pricePerDay;
    const outGame = games
      .filter((value) => value.id === gameId)
      .map((value) => value.stockTotal - 1);

    await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);',
      [
        customerId,
        gameId,
        date,
        daysRented,
        returnDate,
        Number(originalPrice),
        delayFee,
      ]
    );

    await connection.query('UPDATE games SET "stockTotal"=$1 WHERE id=$2;', [
      Number(outGame),
      gameId,
    ]);

    res.sendStatus(201);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function ReadRentals(req, res){
  const { customerId, gameId } = req.query;
  
}

export { InsertRental, ReadRentals };
