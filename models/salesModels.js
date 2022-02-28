const connection = require('./connection');

const getAll = async () => {
  const sql = `SELECT 
      sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM 
      StoreManager.sales_products AS sp
    INNER JOIN 
      StoreManager.sales AS s ON sp.sale_id = s.id
    ORDER BY 
      sp.sale_id, sp.product_id;`;
  const [results] = await connection.execute(sql);

  return results;
};

const getById = async (id) => {
  const sql = `SELECT 
    s.date, sp.product_id, sp.quantity
  FROM 
    StoreManager.sales_products AS sp
  INNER JOIN 
    StoreManager.sales AS s ON sp.sale_id = s.id
  WHERE 
    s.id = ?
  ORDER BY 
    sp.product_id;`;
  const [result] = await connection.execute(sql, [id]);
  
  return result;
};

const exclude = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?;', [id]);
};

module.exports = {
  getAll,
  getById,
  exclude,
};