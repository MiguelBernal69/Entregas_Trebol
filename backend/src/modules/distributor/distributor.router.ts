import { Router } from 'express'
import { getMyOrders, getMyOrderById, deliverOrder, getActiveSession, openSession, getSessionReport, closeMySession } from './distributor.controller'
import { authenticate } from '../../middlewares/auth.middleware'
import { authorize } from '../../middlewares/role.middleware'

const router = Router()

router.use(authenticate, authorize('distribuidor'))

// Pedidos del distribuidor
router.get('/orders', getMyOrders)
router.get('/orders/:id', getMyOrderById)
router.patch('/orders/:id/deliver', deliverOrder)

// Sesiones de distribución (distribuidor)
router.get('/session', getActiveSession)
router.post('/session/open', openSession)
router.post('/session/close', closeMySession)
router.get('/session/report', getSessionReport)

export default router