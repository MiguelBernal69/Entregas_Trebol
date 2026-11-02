import { Router } from 'express'
import { getAll, getOne, create, update, remove } from './clients.controller'
import { authenticate } from '../../middlewares/auth.middleware'
import { authorize } from '../../middlewares/role.middleware'
import { uploadClientPhoto } from '../../config/upload'

const router = Router()

router.use(authenticate)

// Admin y preventista pueden gestionar clientes
router.get('/', authorize('admin', 'preventista'), getAll)
router.get('/:id', authorize('admin', 'preventista'), getOne)
router.post('/', authorize('admin', 'preventista'), uploadClientPhoto.single('photo'), create)
router.put('/:id', authorize('admin', 'preventista', 'distribuidor'), uploadClientPhoto.single('photo'), update)
router.delete('/:id', authorize('admin', 'preventista'), remove)

export default router
