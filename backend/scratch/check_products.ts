import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  try {
    const products = await prisma.product.findMany({
      include: {
        _count: {
          select: { orderItems: true }
        }
      },
      orderBy: { name: 'asc' }
    })

    console.log('\nID | Nombre | Pedidos')
    console.log('-----------------------')
    products.forEach(p => {
      console.log(`${p.id.toString().padEnd(2)} | ${p.name.padEnd(20)} | ${p._count.orderItems}`)
    })
    console.log('\n')
  } catch (err) {
    console.error('Error al realizar la consulta:', err)
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
