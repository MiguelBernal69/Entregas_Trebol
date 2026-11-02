const { Pool } = require('pg');
require('dotenv').config({ path: 'c:/programasD/Entregas/backend/.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  try {
    const res = await pool.query(`SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name = 'Region'`);
    console.log(JSON.stringify(res.rows, null, 2));
    
    // Also check if postgis extension is installed
    const ext = await pool.query(`SELECT extname FROM pg_extension WHERE extname = 'postgis'`);
    console.log('PostGIS Extension:', ext.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
