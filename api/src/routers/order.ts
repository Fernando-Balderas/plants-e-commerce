import express from 'express'

import verifyAuth from '../middlewares/verifyAuth'
import verifyPermission from '../middlewares/verifyPermission'
import orderController from '../controllers/order'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.get('/', orderController.findAll)
router.get('/user/:userId', orderController.findUserOrders)
router.get('/:orderId', orderController.findById)
router.put('/:orderId', verifyAuth, verifyPermission, orderController.update)
router.delete(
  '/:orderId',
  verifyAuth,
  verifyPermission,
  orderController._delete
)
router.post('/', verifyAuth, verifyPermission, orderController.create)

export default router
