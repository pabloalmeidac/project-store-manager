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

const create = async (req, res, _next) => {
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
  };

const update = async (req, res, _next) => {
    const { error } = productsSchema.isValid(req.body);
    const { id } = req.params;
    const { name, quantity } = req.body;
    
    if (error) {
      // split error do brabo NASC
      
      const [code, message] = error.message.split('|');
      return res.status(code).json({ message });
    } 
    console.log(id, name, quantity);
    const productUpdated = await productsServices.update(id, { name, quantity });
  
    if (!productUpdated) res.status(404).json({ message: 'Product not found' });
    
    return res.status(200).json(productUpdated);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};

// GET /products deve responder code 200 com o array de objetos