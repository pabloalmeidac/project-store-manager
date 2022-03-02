/* eslint-disable camelcase */
const salesModels = require('../models/salesModels');

const serialize = (sales) => {
  const { sale_id: saleId, date, product_id: productId, quantity } = sales;
  
  if (saleId) return { saleId, date, productId, quantity };
  
  return { date, productId, quantity };
};

const getAll = async () => {
  const sales = await salesModels.getAll();
  
  return sales.map(serialize);
};

const getById = async (id) => {
  const sales = await salesModels.getById(id);
  
  if (sales === undefined) {
    return sales;
  } 
  return sales.map(serialize);
};

const exclude = async (id) => {
  const sale = await salesModels.getById(id);
  
  if (sale.length === 0) return sale;
  
  await salesModels.exclude(id);
  
  return id;
};

const create = async (sales) => {
  const saleInsertId = await salesModels.create(sales);
  const salesById = await getById(saleInsertId);

  const itemsSold = [];
  salesById.map(({ productId, quantity }) => itemsSold.push({ productId, quantity }));
  
  const newSales = { id: saleInsertId, itemsSold };
  return newSales;
};

module.exports = {
  getAll,
  getById,
  exclude,
  create,
};
