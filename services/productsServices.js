const productsModels = require('../models/productsModels');

const getAll = async () => {
  const products = await productsModels.getAll();
  
  return products;
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  
  return product;
};

const create = async ({ name, quantity }) => {
  const products = await productsModels.getAll();
  const product = products.find((p) => (p.name === name));

  if (!product) {
    const newProduct = await productsModels.create({ name, quantity });
    return newProduct;
  }
  
  if (product.name === name) return undefined;
};

const update = async (id, { name, quantity }) => {
  const productUpdated = await productsModels.update(id, { name, quantity });
  return productUpdated;
};

const exclude = async (id) => {
  const product = await productsModels.getById(id);
  
  if (product === undefined) return product;
  
  await productsModels.exclude(id);
  return id;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
