// O Lucas Felipe da turma B me ajudou nesse validate ja que joi me deixou na mão
const salesSchema = require('../schemas/salesSchema');

const validateSale = (req, res, next) => {
  const { body } = req;
  body.map(({ productId, quantity }) => {
    const { error } = salesSchema.isValid({ productId, quantity });
        
    if (error) {
      // split error do brabo NASC
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
    return 0;
  });
  return next();
};

module.exports = validateSale;