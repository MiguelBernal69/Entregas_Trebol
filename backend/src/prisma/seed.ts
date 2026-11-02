import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string })
const prisma = new PrismaClient({ adapter })
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function main() {
  console.log('🌱 Iniciando seed...')

  const adminPass        = await bcrypt.hash('admin123', 10)
  const preventistaPass  = await bcrypt.hash('carlos123', 10)
  const distribuidorPass = await bcrypt.hash('luis123', 10)

  const admin = await prisma.user.create({
    data: { name: 'Admin Principal', email: 'admin@pedidos.com', password: adminPass, role: 'admin', phone: '70000001' }
  })

  const preventista = await prisma.user.create({
    data: { name: 'Carlos Mamani', email: 'carlos@pedidos.com', password: preventistaPass, role: 'preventista', phone: '70012345' }
  })

  const distribuidor = await prisma.user.create({
    data: { name: 'Luis Flores', email: 'luis@pedidos.com', password: distribuidorPass, role: 'distribuidor', phone: '70099887' }
  })

  console.log('✅ Usuarios creados')

  const papasClasicas = await prisma.product.create({ data: { name: 'Papas Clásicas', price: 5.50, unit: 'bolsa' } })
  const papasRizadas  = await prisma.product.create({ data: { name: 'Papas Rizadas',  price: 6.00, unit: 'bolsa' } })
  const papasMedianas = await prisma.product.create({ data: { name: 'Papas Medianas', price: 12.00, unit: 'caja' } })

  console.log('✅ Productos creados')

  const region = await prisma.region.create({
    data: { name: 'Zona Norte', color: '#EF4444', createdBy: admin.id }
  })

  await pool.query(
    `UPDATE "Region" SET polygon = ST_GeomFromText($1, 4326) WHERE id = $2`,
    [
      'POLYGON((-66.1650 -17.3650, -66.1250 -17.3650, -66.1250 -17.3950, -66.1650 -17.3950, -66.1650 -17.3650))',
      region.id
    ]
  )

  console.log('✅ Región creada')

  const cliente1 = await prisma.client.create({
    data: { name: 'Tienda Don Jorge', ownerName: 'Jorge Pérez', phone: '70011223', address: 'Av. Heroínas 123', latitude: -17.3895, longitude: -66.1568, createdBy: preventista.id, regionId: region.id }
  })

  const cliente2 = await prisma.client.create({
    data: { name: 'Tienda La Esquina', ownerName: 'María López', phone: '70099887', address: 'Calle Sucre 456', latitude: -17.3901, longitude: -66.1574, createdBy: preventista.id, regionId: region.id }
  })

  console.log('✅ Clientes creados')

  const orden1 = await prisma.order.create({
    data: {
      clientId: cliente1.id, preventistaId: preventista.id, regionId: region.id,
      status: 'aceptado', notes: 'Entregar por la mañana',
      items: {
        create: [
          { productId: papasClasicas.id, quantity: 10, unitPrice: papasClasicas.price },
          { productId: papasRizadas.id,  quantity: 5,  unitPrice: papasRizadas.price }
        ]
      }
    }
  })

  const orden2 = await prisma.order.create({
    data: {
      clientId: cliente2.id, preventistaId: preventista.id, regionId: region.id,
      status: 'asignado', distributorId: distribuidor.id, notes: 'Pedido de prueba',
      items: {
        create: [
          { productId: papasMedianas.id, quantity: 3, unitPrice: papasMedianas.price },
          { productId: papasClasicas.id, quantity: 8, unitPrice: papasClasicas.price }
        ]
      }
    }
  })

  console.log('✅ Pedidos creados')

  await prisma.orderHistory.create({
    data: {
      orderId: orden1.id, changedBy: preventista.id, action: 'created', newStatus: 'aceptado',
      snapshotData: {
        order: { id: orden1.id, status: 'aceptado', notes: orden1.notes },
        client: { name: cliente1.name, address: cliente1.address },
        preventista: { id: preventista.id, name: preventista.name },
        distribuidor: null,
        items: [
          { productName: 'Papas Clásicas', quantity: 10, unitPrice: 5.50 },
          { productName: 'Papas Rizadas',  quantity: 5,  unitPrice: 6.00 }
        ],
        total: 80.00
      }
    }
  })

  await prisma.orderHistory.create({
    data: {
      orderId: orden2.id, changedBy: admin.id, action: 'assigned',
      previousStatus: 'aceptado', newStatus: 'asignado',
      snapshotData: {
        order: { id: orden2.id, status: 'asignado', notes: orden2.notes },
        client: { name: cliente2.name, address: cliente2.address },
        preventista: { id: preventista.id, name: preventista.name },
        distribuidor: { id: distribuidor.id, name: distribuidor.name },
        items: [
          { productName: 'Papas Medianas', quantity: 3, unitPrice: 12.00 },
          { productName: 'Papas Clásicas', quantity: 8, unitPrice: 5.50 }
        ],
        total: 80.00
      }
    }
  })

  console.log('✅ Historial creado')
  console.log('🎉 Seed completado exitosamente')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })