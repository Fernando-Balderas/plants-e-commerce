import express from 'express'

import productController from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.get('/', productController.findAll)
router.get('/:productId', productController.findById)

// TODO: Add autentication for the next endpoints
router.put('/:productId', productController.update)
router.delete('/:productId', productController._delete)
router.post('/', productController.create)

export default router
