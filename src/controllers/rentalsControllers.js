import connection from "../db/db.js";
import dayjs from "dayjs";

async function InsertRental(req, res) {
  const { customerId, gameId, daysRented } = res.locals.rental;
  const returnDate = null;
  const delayFee = null;
  const date = dayjs().locale("pt-br").format("YYYY-MM-DD");

  try {
    const game = await connection.query(`SELECT * FROM games WHERE id=$1`, [
      gameId,
    ]);
    const validGame = game.rows.find(
      (value) => value.id === gameId && value.stockTotal > 0
    );
    const originalPrice = daysRented * validGame.pricePerDay;
    const outGame = game.rows
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

async function ReadRentals(req, res) {
  const { customerId, gameId } = req.query;
  try {
    if (customerId) {
      return await getRentalsByCustomerId(customerId, res);
    }
    if (gameId) {
      return await getRentalsByGameId(gameId, res);
    }

    const rentals = (
      await connection.query(
        'SELECT rentals.*, customers.name AS customer, games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id;'
      )
    ).rows;

    const response = rentals.map((rental) => {
      return {
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: rental.rentDate,
        daysRented: rental.daysRented,
        returnDate: rental.returnDate,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,
        customer: {
          id: rental.customerId,
          name: rental.customer,
        },
        game: {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        },
      };
    });

    res.send(response);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function ReturnRental(req, res) {
  const { id } = req.params;
  const rent = res.locals.rent;

  try {
    const difference = new Date().getTime() - new Date(rent.rentDate).getTime();
    const resultDays = Math.floor(difference / (24 * 3600 * 1000));
    let delayFee = 0;
    if (resultDays > rent.daysRented) {
      const extraDays = resultDays - rent.daysRented;
      delayFee = extraDays * rent.originalPrice;
    }
    await connection.query(
      `UPDATE rentals SET "returnDate"=NOW(), "delayFee"=$1 WHERE id=$2`,
      [delayFee, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function DeleteRental(req, res) {
  const { id } = req.params;

  try {
    await connection.query("DELETE FROM rentals WHERE id =$1", [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

export { InsertRental, ReadRentals, ReturnRental, DeleteRental };

//callback functions

async function getRentalsByGameId(gameId, res) {
  const rentals = (
    await connection.query(
      'SELECT rentals.*, customers.name AS customer, games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE rentals."gameId"=$1;',
      [gameId]
    )
  ).rows;
  const response = rentals.map((rental) => {
    return {
      id: rental.id,
      customerId: rental.customerId,
      gameId: rental.gameId,
      rentDate: rental.rentDate,
      daysRented: rental.daysRented,
      returnDate: rental.returnDate,
      originalPrice: rental.originalPrice,
      delayFee: rental.delayFee,
      customer: {
        id: rental.customerId,
        name: rental.customer,
      },
      game: {
        id: rental.gameId,
        name: rental.gameName,
        categoryId: rental.categoryId,
        categoryName: rental.categoryName,
      },
    };
  });
  return res.send(response);
}

async function getRentalsByCustomerId(customerId, res) {
  const rentals = (
    await connection.query(
      'SELECT rentals.*, customers.name AS customer, games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE rentals."customerId"=$1;',
      [customerId]
    )
  ).rows;

  const response = rentals.map((rental) => {
    return {
      id: rental.id,
      customerId: rental.customerId,
      gameId: rental.gameId,
      rentDate: rental.rentDate,
      daysRented: rental.daysRented,
      returnDate: rental.returnDate,
      originalPrice: rental.originalPrice,
      delayFee: rental.delayFee,
      customer: {
        id: rental.customerId,
        name: rental.customer,
      },
      game: {
        id: rental.gameId,
        name: rental.gameName,
        categoryId: rental.categoryId,
        categoryName: rental.categoryName,
      },
    };
  });
  return res.send(response);
}
