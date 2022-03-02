const productsServices = require('../services/productsServices');
const productsSchema = require('../schemas/productsSchema');

const getAll = async (_req, res, next) => {
  try {
    const products = await productsServices.getAll();
  
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

const create = async (req, res, next) => {
  try {
    const { error } = productsSchema.isValid(req.body);
    const { name, quantity } = req.body;
    
    if (error) {
      // split error do brabo NASC
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    } 
    
    const newProduct = await productsServices.create({ name, quantity });
    
    if (!newProduct) return res.status(409).json({ message: 'Product already exists' });
    
    return res.status(201).json(newProduct);
  } catch (error) {
      next(error);
    }
  };

const update = async (req, res, next) => {
  try {
    const { error } = productsSchema.isValid(req.body);
    
    const { id } = req.params;
    const { name, quantity } = req.body;
    
    if (error) {
      // split error do brabo NASC
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    } 
    
    const productUpdated = await productsServices.update(id, { name, quantity });
    
    if (!productUpdated) res.status(404).json({ message: 'Product not found' });
    
    return res.status(200).json(productUpdated);
  } catch (error) {
      next(error);
    }
};

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;
    const excludeProduct = await productsServices.exclude(id);
    
    if (excludeProduct === undefined) res.status(404).json({ message: 'Product not found' });

    return res.status(204).end();
  } catch (error) {
      next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
