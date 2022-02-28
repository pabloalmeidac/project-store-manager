const Joi = require('joi');

const salesSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required()
  .strict(),
}).messages({
  'any.required': '400|{{ #label }} is required',
  'number.positive': '422|{{ #label }} must be greater than or equal to 1',
});

const isValid = (salesData) => salesSchema.validate(salesData);

module.exports = { isValid };