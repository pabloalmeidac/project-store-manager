const salesServices = require('../services/salesServices');
const salesSchema = require('../schemas/salesSchema');

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesServices.getAll();
  
    if (sales.length === 0 || sales === undefined) {
      return res.status(404).json({ message: 'Sale not found' });
    } 
    
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  
  const sales = await salesServices.getById(id);

  if (sales.length === 0 || sales === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  
  return res.status(200).json(sales);
};

const create = async (req, res, _next) => {
  const { error } = salesSchema.isValid(req.body);
  const { productId, quantity } = req.body;
  
  if (error) {
    // split error do brabo NASC
    console.log('caiu');
    const [code, message] = error.message.split('|');
    console.log(code);
    return res.status(code).json({ message });
  } 
  
  return console.log(productId, quantity);
};

module.exports = {
  getAll,
  getById,
  create,
};
