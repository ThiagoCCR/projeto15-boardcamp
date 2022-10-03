import connection from "../db/db.js";

async function CreateCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer;

  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function ReadCustomer(req, res) {
  const searchByCpf = req.query.cpf;

  try {
    if (searchByCpf) {
      const result = await connection.query(
        "SELECT * FROM customers WHERE customers.cpf LIKE ($1);",
        [`${searchByCpf}%`]
      );
      return res.send(result.rows);
    } else {
      let costumersList = await connection.query("SELECT * FROM customers");
      costumersList = costumersList.rows;
      res.status(200).send(costumersList);
    }
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function GetCostumerById(req, res) {
  const id = req.params.id;
  try {
    const customer = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [id]
    );
    if (customer.rows.length === 0) {
      return res.status(404).send("Usuário não encontrado");
    }
    res.send(customer.rows);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

async function UpdateUser(req, res) {
  const id = req.params.id;
  const { name, phone, cpf, birthday } = res.locals.customer;

  try {
    await connection.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;",
      [name, phone, cpf, birthday, id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}

export { CreateCustomer, ReadCustomer, GetCostumerById, UpdateUser };
