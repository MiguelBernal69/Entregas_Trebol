const { PrismaClient } = require('./src/generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
async function main() {
  const carlos = await prisma.user.findUnique({ where: { email: 'carlos@pedidos.com' } });
  if (!carlos) {
    console.log('Carlos not found');
    return;
  }
  console.log('Carlos ID:', carlos.id);
  
  const regions = await prisma.userRegion.findMany({ where: { userId: carlos.id } });
  console.log('Carlos Regions:', JSON.stringify(regions, null, 2));
  
  const clients = await prisma.client.findMany({ where: { isActive: true } });
  console.log('Total Active Clients:', clients.length);
  clients.forEach(c => {
    console.log(`- ${c.name} (RegionID: ${c.regionId})`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
