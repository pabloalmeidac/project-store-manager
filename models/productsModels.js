const connection = require('./connection');

const getAll = async () => {
  const [results] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id;');

  return results;
};

const getById = async (id) => {
  const sql = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(sql, [id]);
  
  return result[0];
};

module.exports = {
  getAll,
  getById,
};