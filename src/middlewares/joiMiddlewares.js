import joi from "joi";

const gameSchema = joi.object({
  name: joi.string().min(3).required(),
  image: joi.string().required(),
  stockTotal: joi.number().min(1).required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().min(1).required(),
});

async function validateGameSchema(req, res, next) {
  const gameData = req.body;
  const validation = gameSchema.validate(gameData, { abortEarly: false });

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(422).send(error);
  }

  res.locals.game = gameData;

  next();
}

export { validateGameSchema };
