/**
 * Script de migración: sincroniza el regionId de los pedidos
 * con el regionId actual de su cliente.
 *
 * Ejecución: npx ts-node src/prisma/sync-order-regions.ts
 */
import prisma from './client'

async function main() {
  // Obtener todos los pedidos sin región asignada
  const orders = await prisma.order.findMany({
    where: { regionId: null },
    include: { client: { select: { id: true, regionId: true } } }
  })

  console.log(`Pedidos sin región: ${orders.length}`)

  let updated = 0
  for (const order of orders) {
    if (order.client.regionId !== null) {
      await prisma.order.update({
        where: { id: order.id },
        data: { regionId: order.client.regionId }
      })
      updated++
    }
  }

  console.log(`✅ Pedidos actualizados: ${updated}`)
  console.log(`⚠️  Pedidos sin región (cliente tampoco tiene): ${orders.length - updated}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
