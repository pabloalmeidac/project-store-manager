// O Lucas Felipe da turma B me ajudou nesse validate ja que joi me deixou na mão

const quantityCheck = (quantity) => {
  if (quantity < 0 || typeof quantity === 'string') {
    return true;
  }
  return false;
};
const validateSale = (req, res, next) => {
  const { body } = req;
  body.map(({ productId, quantity }) => {
    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (quantity === 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (quantityCheck(quantity)) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    return 0;
  });
  return next();
};
module.exports = validateSale;