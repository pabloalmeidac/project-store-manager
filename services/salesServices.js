const salesModels = require('../models/salesModels');

const list = async () => {
  const sales = await salesModels.list();

  return sales;
};

const getById = async (id) => {
  const sales = await salesModels.getById(id);
  
  return sales;
};

module.exports = {
  list,
  getById,
};
