import { Router } from 'express'
import { getAllSessions, getSessionById, closeSession } from './sessions.controller'
import { authenticate } from '../../middlewares/auth.middleware'
import { authorize } from '../../middlewares/role.middleware'

const router = Router()

router.use(authenticate, authorize('admin'))

router.get('/', getAllSessions)
router.get('/:id', getSessionById)
router.patch('/:id/close', closeSession)

export default router
