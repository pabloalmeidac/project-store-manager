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
  await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?;', [id]);
};

// lucas da turma B me ajudou nesse codigo
const create = async (sales) => {
  const sqlTableSales = `
    INSERT INTO StoreManager.sales () VALUES ();`;

  const [sale] = await connection.execute(sqlTableSales);

  const sqlTableSalesProducts = `
    INSERT INTO 
      StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES 
      (?, ?, ?);`;
  
  const salesProducts = sales.map(async ({ productId, quantity }) => {
    await connection.execute(sqlTableSalesProducts, [sale.insertId, productId, quantity]);
  });

  await Promise.all(salesProducts);
  return sale.insertId;
  };

module.exports = {
  create,
  getAll,
  getById,
  exclude,
};