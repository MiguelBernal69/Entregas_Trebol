const { PrismaClient } = require('./backend/src/generated/prisma')
const prisma = new PrismaClient()

async function main() {
  const orders = await prisma.order.findMany({
    take: 5,
    include: {
      client: true
    }
  })
  console.log('Orders sample with client data:')
  console.log(JSON.stringify(orders, null, 2))
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
