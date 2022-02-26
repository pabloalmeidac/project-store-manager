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

const create = async ({ name, quantity }) => {
  const sql = `
    INSERT INTO 
      StoreManager.products (name, quantity) 
    VALUES 
      (?, ?);`;
  const [{ insertId }] = await connection.execute(sql, [name, quantity]);
  
  return {
    id: insertId,
    name,
    quantity,
  };
};

const update = async (id, { name, quantity }) => {
  console.log('ta no models');
  const sql = `
    UPDATE 
      products
    SET
      name = ?, quantity = ?
    WHERE 
      id = ?;`;
  await connection.execute(sql, [name, quantity, id]);

  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};