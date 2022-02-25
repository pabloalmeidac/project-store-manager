/* eslint-disable camelcase */
const salesModels = require('../models/salesModels');

const serialize = (sales) => {
  const { sale_id: saleId, date, product_id: productId, quantity } = sales;

  if (saleId) return { saleId, date, productId, quantity };
   
  return { date, productId, quantity };
};

const list = async () => {
  const sales = await salesModels.list();

  return sales.map(serialize);
};

const getById = async (id) => {
  const sales = await salesModels.getById(id);
  
  if (sales === undefined) {
    return sales;
  } 
  return sales.map(serialize);
};

module.exports = {
  list,
  getById,
};
