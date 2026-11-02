const { Client } = require('pg');
require('dotenv').config();

async function checkProducts() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    
    const res = await client.query(`
      SELECT p.id, p.name, (SELECT COUNT(*) FROM "OrderItem" WHERE "productId" = p.id) as order_count
      FROM "Product" p
      ORDER BY p.id ASC;
    `);

    console.log('\nID | Nombre               | Pedidos');
    console.log('-----------------------------------');
    res.rows.forEach(row => {
      console.log(`${row.id.toString().padEnd(2)} | ${row.name.padEnd(20)} | ${row.order_count}`);
    });
    console.log('\n');

  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  } finally {
    await client.end();
  }
}

checkProducts();
