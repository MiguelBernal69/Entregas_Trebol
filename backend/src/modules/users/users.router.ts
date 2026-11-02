import { Router } from 'express'
import { getAll, getOne, create, update, toggle, getUserRegions } from './users.controller'
import { authenticate } from '../../middlewares/auth.middleware'
import { authorize } from '../../middlewares/role.middleware'

const router = Router()

// Todos los endpoints solo para admin
router.use(authenticate, authorize('admin'))

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/:id', update)
router.patch('/:id/toggle', toggle)
router.get('/:id/regions', getUserRegions)

export default router