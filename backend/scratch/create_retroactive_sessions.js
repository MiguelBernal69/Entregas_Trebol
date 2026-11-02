const { PrismaClient } = require('../src/generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Iniciando script de creación de sesiones retroactivas...');

  // 1. Definir el inicio del día en Bolivia (UTC-4)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfDayBolivia = new Date(today.getTime() - (4 * 60 * 60 * 1000)); 

  console.log(`📅 Buscando actividad desde: ${startOfDayBolivia.toISOString()}`);

  // 2. Obtener todos los distribuidores
  const distributors = await prisma.user.findMany({
    where: { role: 'distribuidor', isActive: true }
  });

  let creadas = 0;
  let omitidas = 0;

  for (const d of distributors) {
    // Verificar si ya tiene una sesión activa
    const activeSession = await prisma.distributionSession.findFirst({
      where: { distributorId: d.id, status: 'activa' }
    });

    if (activeSession) {
      console.log(`⏩ Distribuidor ${d.name} (ID: ${d.id}) ya tiene sesión activa. Omitiendo.`);
      omitidas++;
      continue;
    }

    // Verificar si tiene pedidos hoy (asignados o entregados hoy)
    const hasActivity = await prisma.order.findFirst({
      where: {
        distributorId: d.id,
        OR: [
          { status: 'asignado' },
          { 
            status: { in: ['entregado', 'entrega_parcial'] },
            deliveredAt: { gte: startOfDayBolivia }
          }
        ]
      }
    });

    if (hasActivity) {
      // Crear sesión retroactiva
      await prisma.distributionSession.create({
        data: {
          distributorId: d.id,
          openedAt: startOfDayBolivia, // Abrirlos al inicio del día
          status: 'activa'
        }
      });
      console.log(`✅ Sesión creada para: ${d.name} (ID: ${d.id})`);
      creadas++;
    } else {
      console.log(`ℹ️ Distribuidor ${d.name} (ID: ${d.id}) no tiene actividad hoy. No se crea sesión.`);
      omitidas++;
    }
  }

  console.log('\n--- Resumen ---');
  console.log(`Total procesados: ${distributors.length}`);
  console.log(`Sesiones creadas: ${creadas}`);
  console.log(`Sesiones omitidas/ya existentes: ${omitidas}`);
}

main()
  .catch(e => {
    console.error('❌ Error ejecutando el script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
