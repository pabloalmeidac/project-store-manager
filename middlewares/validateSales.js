const salesSchema = require('../schemas/salesSchema');

const validateSales = (req, res, next) => {
  const { body } = req;
  let response = {};
  body.map(({ productId, quantity }) => {
    const { error } = salesSchema.isValid({ productId, quantity });
        
    if (error) {
      const [code, message] = error.message.split('|');
      response = { code, message };
    }
  });

  if(response.message) return res.status(response.code).json({ message: response.message});
  return next();
};

module.exports = validateSales;