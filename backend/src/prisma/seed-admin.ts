import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL as string })
})

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@trebol.com'
  const password = process.env.ADMIN_PASSWORD || 'CambiaEstaClave123!'
  const name = process.env.ADMIN_NAME || 'Administrador'
  const phone = process.env.ADMIN_PHONE || undefined

  await prisma.user.upsert({
    where: { email },
    update: { name, phone, role: 'admin', isActive: true },
    create: {
      name,
      email,
      phone,
      password: await bcrypt.hash(password, 10),
      role: 'admin'
    }
  })

  console.log(`Administrador listo: ${email}`)
  console.log('Base inicializada sin clientes, productos, regiones ni pedidos.')
}

main()
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => prisma.$disconnect())
