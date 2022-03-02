const salesServices = require('../services/salesServices');

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

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const sales = await salesServices.getById(id);
  
    if (sales.length === 0 || sales === undefined) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(sales);
  } catch (error) {
      next(error);
    }
};

const create = async (req, res, next) => {
  try {
    const newSales = await salesServices.create(req.body);
    return res.status(201).json(newSales);
  } catch (error) {
      next(error);
  }
};

const update = (_req, _res, _next) => console.log('oi');

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;
    const excludeSale = await salesServices.exclude(id);
    
    if (!excludeSale.length) res.status(404).json({ message: 'Sale not found' });

    return res.status(204).end();
  } catch (error) {
      next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  exclude,
  update,
};
