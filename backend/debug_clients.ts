import { PrismaClient } from './src/generated/prisma';
import 'dotenv/config';

const prisma = new PrismaClient();

async function debug() {
  const user = await prisma.user.findUnique({ where: { email: 'carlos@pedidos.com' } });
  if (!user) {
    console.log('User not found');
    return;
  }
  console.log('User Carlos:', user.id, user.role);

  const userRegions = await prisma.userRegion.findMany({
    where: { userId: user.id },
    select: { regionId: true }
  });
  console.log('User Regions (UserRegion table):', userRegions);
  const regionIds = userRegions.map(ur => ur.regionId);

  const clients = await prisma.client.findMany({
    where: {
      isActive: true,
      OR: [
        { regionId: { in: regionIds } },
        { regionId: null }
      ]
    },
    include: { region: true }
  });

  console.log('Filtered Clients Count:', clients.length);
  clients.forEach(c => {
    console.log(`- ${c.name} (RegionID in Client: ${c.regionId} - ${c.region?.name || 'None'})`);
  });

  const allClients = await prisma.client.findMany({ 
    where: { isActive: true },
    include: { region: true }
  });
  console.log('All Active Clients in DB:', allClients.length);
  allClients.forEach(c => {
    console.log(`  * ${c.name} (RegionID: ${c.regionId} - ${c.region?.name || 'None'})`);
  });
}

debug().finally(() => prisma.$disconnect());
