// O Lucas Felipe da turma B me ajudou nesse validate ja que joi me deixou na mão
const productsSchema = require('../schemas/productsSchema');

const validateProducts = (req, res, next) => {
    const { error } = productsSchema.isValid(req.body);
        
    if (error) {
      // split error do brabo NASC
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    }
  return next();
};
module.exports = validateProducts;