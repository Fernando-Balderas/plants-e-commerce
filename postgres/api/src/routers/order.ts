import express from 'express'

import orderController from '../controllers/order'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.get('/', orderController.findAll)
// router.get('/user/:userId', orderController.findUserOrders)
router.get('/:orderId', orderController.findById)
router.put('/:orderId', orderController.update)
router.delete('/:orderId', orderController._delete)
router.post('/', orderController.create)

export default router
