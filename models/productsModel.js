const connection = require('./connection');

const list = async () => {
  const [results] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id;');

  return results;
};

module.exports = {
  list,
};