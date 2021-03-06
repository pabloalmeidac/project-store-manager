/* eslint-disable no-useless-escape */
const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().positive().required()
  .strict(),
}).messages({
  'any.required': '400|{{ #label }} is required',
  'string.base': '422|{{ #label }} must be a string',
  'string.min': '422|{{ #label }} length must be at least {{ #limit }} characters long',
  'number.positive': '422|{{ #label }} must be greater than or equal to 1',
});

const isValid = (productData) => productsSchema.validate(productData);

module.exports = { isValid };