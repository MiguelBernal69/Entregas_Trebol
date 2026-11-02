import { Router } from 'express'
import {
  getAll, getOne, create, update, remove,
  getOrdersInRegion, detectRegion,
  assignRegion, assignBulk, removeRegion, getPreventistasInRegion,
  getMyRegions, recalculate
} from './regions.controller'
import { authenticate } from '../../middlewares/auth.middleware'
import { authorize } from '../../middlewares/role.middleware'

const router = Router()

router.use(authenticate)

// Ruta especial para que el preventista consulte sus propias zonas
router.get('/me', authorize('admin', 'preventista', 'distribuidor'), getMyRegions)

router.get('/detect', authorize('admin', 'preventista'), detectRegion)
router.get('/:id/orders', authorize('admin'), getOrdersInRegion)
router.get('/:id/preventistas', authorize('admin'), getPreventistasInRegion)

router.get('/', authorize('admin', 'preventista'), getAll)
router.get('/:id', authorize('admin', 'preventista'), getOne)
router.post('/recalculate', authorize('admin'), recalculate)
router.post('/', authorize('admin'), create)
router.put('/:id', authorize('admin'), update)
router.delete('/:id', authorize('admin'), remove)

router.post('/assign', authorize('admin'), assignRegion)
router.post('/assign-bulk', authorize('admin'), assignBulk)
router.delete('/assign', authorize('admin'), removeRegion)

export default router
