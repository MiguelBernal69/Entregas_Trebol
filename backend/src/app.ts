import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import authRouter from './modules/auth/auth.router'
import usersRouter from './modules/users/users.router'
import clientsRouter from './modules/clients/clients.router'
import productsRouter from './modules/products/products.router'
import ordersRouter from './modules/orders/orders.router'
import regionsRouter from './modules/regions/regions.router'
import distributorRouter from './modules/distributor/distributor.router'
import sessionsRouter from './modules/distributor/sessions.router'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Servir archivos estáticos (fotos de clientes)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/clients', clientsRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/regions', regionsRouter)
app.use('/api/distributor', distributorRouter)
app.use('/api/sessions', sessionsRouter)

app.get('/api/version', (req, res) => {
  res.json({
    name: 'Distribuidora Lunova API',
    version: '1.2.0',
    status: 'online',
  })
})

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))

// Mantener el bucle de eventos activo para evitar cierres prematuros del proceso Node
setInterval(() => {}, 1000 * 60 * 60)

export default app