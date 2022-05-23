import express from 'express'

import userController from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', userController.findAll)
router.get('/:userId', userController.findById)
router.put('/:userId', userController.update)
router.delete('/:userId', userController._delete)
router.post('/signup', userController.create)
router.post('/login', userController.findByEmailAndPassword)

export default router
