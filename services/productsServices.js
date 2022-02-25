const productsModels = require('../models/productsModels');

const list = async () => {
  const products = await productsModels.list();

  return products;
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  
  return product;
};

module.exports = {
  list,
  getById,
};
