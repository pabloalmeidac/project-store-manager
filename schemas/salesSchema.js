const Joi = require('joi');

const salesSchema = Joi.object({
  productId: Joi.string().min(5).required(),
  quantity: Joi.number().integer().positive().required()
  .strict(),
}).messages({
  'any.required': '400|{{ #label }} is required',
  'string.base': '422|{{ #label }} must be a string',
  'string.min': '422|{{ #label }} length must be at least {{ #limit }} characters long',
  'number.positive': '422|{{ #label }} must be greater than or equal to 1',
});

const isValid = (salesData) => salesSchema.validate(salesData);

module.exports = { isValid };