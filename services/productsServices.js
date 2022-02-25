const productsModel = require('../models/productsModel');

const list = async () => {
  const products = await productsModel.list();
  console.log(products);
  return products;
};

module.exports = {
  list,
};
