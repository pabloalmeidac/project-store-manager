const productsServices = require('../services/productsServices');

const list = async (_req, res, next) => {
  try {
    const products = await productsServices.list();
  
    if (products.length === 0) res.status(404).json({ message: 'Product not found' });
    
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const product = await productsServices.getById(id);
  
    if (product === undefined) res.status(404).json({ message: 'Product not found' });
    
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  getById,
};

// GET /products deve responder code 200 com o array de objetos