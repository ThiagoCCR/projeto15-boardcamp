import joi from "joi";

const gameSchema = joi.object({
  name: joi.string().min(3).required(),
  image: joi.string().required(),
  stockTotal: joi.number().min(1).required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().min(1).required(),
});

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]{10,11}$/)
    .required(),
  cpf: joi
    .string()
    .pattern(/(^([0-9]){11,11}$)/)
    .required(),
  birthday: joi.date().required(),
});

async function validateGameSchema(req, res, next) {
  const gameData = req.body;
  const validation = gameSchema.validate(gameData, { abortEarly: false });

  if (gameData.stockTotal === 0 || gameData.pricePerDay === 0) {
    return res.sendStatus(400);
  }

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(422).send(error);
  }

  res.locals.game = gameData;

  next();
}

async function validateCustomerSchema(req, res, next) {
  const { name, phone, cpf, birthday } = req.body;
  const validation = customerSchema.validate(
    { name, phone, cpf, birthday },
    { abortEarly: false }
  );
  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(400).send(error);
  }
  res.locals.customer = { name, phone, cpf, birthday };
  next();
}

export { validateGameSchema, validateCustomerSchema };
