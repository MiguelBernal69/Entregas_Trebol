import { Router } from 'express'
import { getAll, getOne, getMap, create, update, changeStatus, assign, getMyVisitedToday, getDailyReport } from './orders.controller'
import { authenticate } from '../../middlewares/auth.middleware'
import { authorize } from '../../middlewares/role.middleware'

const router = Router()

router.use(authenticate)

// Las rutas específicas SIEMPRE antes que las rutas con parámetros (:id)
router.get('/map', authorize('admin'), getMap)
router.post('/assign', authorize('admin'), assign)
router.get('/my-visited-today', authorize('preventista'), getMyVisitedToday)
router.get('/daily-report', authorize('admin', 'preventista'), getDailyReport)


router.get('/', authorize('admin', 'preventista'), getAll)
router.get('/:id', authorize('admin', 'preventista'), getOne)
router.post('/', authorize('admin', 'preventista'), create)
router.put('/:id', authorize('admin', 'preventista'), update)
router.patch('/:id/status', authorize('admin'), changeStatus)

export default router