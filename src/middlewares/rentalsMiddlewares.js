import connection from "../db/db.js";

async function validateRental(req, res, next) {
  const { customerId, gameId, daysRented } = res.locals.rental;
  if (daysRented < 1) {
    return res.status(400).send("Os dias alugados tem que ser maior que 1");
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
    if (game.rows[0].stockTotal === 0) {
      return res
        .status(400)
        .send("Não há este jogo disponível para empréstimo");
    }
    res.locals.rental = { customerId, gameId, daysRented };
    next();
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function validateReturnRental(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  try {
    const isRentalValid = (
      await connection.query("SELECT * FROM rentals WHERE id=$1", [id])
    ).rows;
    if (isRentalValid.length===0) {
      return res.status(404).send("Aluguel não encontrado");
    }
    const rent = isRentalValid[0];
    if (rent.returnDate !== null) {
      return res.status(400).send("O aluguel já foi finalizado");
    }
    res.locals.rent = rent;
    next();
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function validateDeleteRental (req, res, next){
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Informe um ID válido");
  }

  try {
    const isValidId = (
      await connection.query("SELECT * from rentals WHERE id=$1", [id])
    ).rows;
    if (isValidId.length === 0) {
      return res.status(404).send("Aluguel não encontrado");
    }
    next();
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

export { validateRental, validateReturnRental, validateDeleteRental };
