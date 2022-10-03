import connection from "../db/db.js";

async function validateCpf(req, res, next) {
  const { name, phone, cpf, birthday } = res.locals.customer;

  try {
    const cpfIsUsed = (
      await connection.query(
        "SELECT name FROM customers WHERE customers.cpf=$1",
        [cpf]
      )
    ).rows;

    if (cpfIsUsed.length > 0) {
      return res.status(409).send("CPF já utilizado!");
    }
    res.locals.customer = { name, phone, cpf, birthday };
    next();
  } catch (error) {
    console.error(error.message);
    return res.sendStatus(500);
  }
}

export { validateCpf };
