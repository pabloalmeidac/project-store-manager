const salesServices = require('../services/salesServices');

const list = async (_req, res, next) => {
  try {
    const sales = await salesServices.list();
  
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

module.exports = {
  list,
  getById,
};
