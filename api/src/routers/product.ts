import express from 'express'

import verifyAuth from '../middlewares/verifyAuth'
import verifyPermission from '../middlewares/verifyPermission'
import productController from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.get('/', productController.findAll)
router.get('/:productId', productController.findById)
router.put(
  '/:productId',
  verifyAuth,
  verifyPermission,
  productController.update
)
router.delete(
  '/:productId',
  verifyAuth,
  verifyPermission,
  productController._delete
)
router.post('/', verifyAuth, verifyPermission, productController.create)

export default router
