import express from 'express'

import productController from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.get('/', productController.findAll)
// router.get('/user/:userId', productController.findUserProducts)
router.get('/:productId', productController.findById)
router.put('/:productId', productController.update)
router.delete('/:productId', productController._delete)
router.post('/', productController.create)
// router.post('/load-dataset', productController.loadDataset)

export default router
